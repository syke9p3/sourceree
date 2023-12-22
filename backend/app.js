import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
import employeeRouter from './routes/employees.routes.js'
import sequelize from './sequelize.js'; // Import your Sequelize instance

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/employees', employeeRouter);

app.get('/example/error', (req, res, next) => {
    next(errorHandler(404, 'Oh no! An example error just occured'));
});

// Display available routes
app.get('/', (req, res) => {
    res.json(
        {
            routes: [
                '/api/employees/',
                '/api/employees/:id'
            ]
        }
    );
});

sequelize.sync({ force: false })
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/`);
        });
    })
    .catch(err => {
        console.error('Error syncing models:', err);
    });