/**
 * Main controller for handling application requests
 */
class MainController {
    /**
     * Handle GET request to the home route
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    getHome(req, res) {
        res.json({
            message: 'Welcome to the Willamette Valley Temple API',
            documentation: '/api-docs'
        });
    }

    /**
     * Handle POST request with data
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    postData(req, res) {
        const data = req.body;

        res.json({
            success: true,
            message: 'Data received successfully',
            data: data
        });
    }
}

// Export the controller class
module.exports = {
    MainController
};