import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
import { createConnection } from './utils/db.js'
import employeeRouter from './routes/employees.routes.js'

const mysqlConnection = createConnection() 

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/employees', employeeRouter);


app.get('/example/error', (req, res, next) => {
    next(errorHandler(404, 'Oh no! An example error just occured'));
});

// Display available routes
app.get('/', (req, res) => {

    const extractRoutes = (router, basePath = '') => {
        const routes = [];

        router.stack.forEach((layer) => {
            if (layer.route) {
                routes.push({
                    method: Object.keys(layer.route.methods)[0].toUpperCase(),
                    path: `${basePath}${layer.route.path}`,
                });
            }
        });

        return routes;
    };

    const routes = extractRoutes(app._router);

    res.json({ routes });
});





// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});