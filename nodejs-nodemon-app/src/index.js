require('dotenv').config();
const express = require('express');
const { setRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add this basic route at the root level
app.get('/health', (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
    console.log(`Test route available at http://localhost:${PORT}/test`);
    console.log(`Swagger JSON available at http://localhost:${PORT}/swagger.json`);
});