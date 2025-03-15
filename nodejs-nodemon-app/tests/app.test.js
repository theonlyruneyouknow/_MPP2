const request = require('supertest');
const app = require('../src/index'); // Adjust the path if necessary

describe('App Tests', () => {
    it('should respond with a 200 status for the home route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should handle data submission', async () => {
        const response = await request(app).post('/data').send({ key: 'value' });
        expect(response.status).toBe(201); // Assuming 201 is the expected status for successful data submission
    });

    // Add more tests as needed
});