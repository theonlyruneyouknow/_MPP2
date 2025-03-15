const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Make sure dotenv is properly loaded
require('dotenv').config();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Willamette Valley Temple',
            version: '1.0.0',
            description: 'Serving the Saints in the Willamette Valley'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            }
        ],
        components: {
            securitySchemes: {
                apiKey: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'subscription-key',
                    description: 'API subscription key required to access endpoints'
                }
            }
        },
        security: [
            {
                apiKey: []
            }
        ]
    },
    apis: ['./src/routes/*.js']  // Make sure this path is correct
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * Configure all routes for the application
 * @param {Express} app - Express application
 */
const setRoutes = (app) => {
    // Middleware to validate subscription key with debug logging
    const validateSubscriptionKey = (req, res, next) => {
        try {
            // Extract subscription key from either header or query parameter
            const subscriptionKey = req.headers['subscription-key'] || req.query.subscription_key;

            // Compare with expected value
            const validKey = process.env.SUBSCRIPTION_KEY || 'temple-access-key';

            if (!subscriptionKey || subscriptionKey !== validKey) {
                // Authentication failed
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Valid subscription key is required'
                });
            }

            // Authentication successful
            next();
        } catch (error) {
            console.error('Error in subscription key validation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // Proper Swagger UI setup - only authenticate the main page, not the assets
    app.get('/api-docs', validateSubscriptionKey);  // Only authenticate this specific route
    app.use('/api-docs', swaggerUi.serve);          // Serve UI assets without authentication
    app.get('/api-docs', swaggerUi.setup(swaggerDocs, {
        explorer: true,
        customSiteTitle: "Willamette Valley Temple API"
    }));

    // Debug routes
    app.get('/test', (req, res) => {
        res.send('API server is working!');
    });

    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });

    const MainController = require('../controllers/index').MainController;
    const controller = new MainController();

    app.get('/', controller.getHome.bind(controller));
    app.post('/data', controller.postData.bind(controller));

    // Sample route with Swagger documentation
    /**
     * @swagger
     * /api/hello:
     *   get:
     *     summary: Returns a hello message
     *     description: A simple endpoint to verify the API works
     *     responses:
     *       200:
     *         description: Successfully returned a greeting
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello, world!' });
    });
};

module.exports = { setRoutes };