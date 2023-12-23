import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/users.routes.js'
import employeeRouter from './routes/employees.routes.js'
import db from './sequelize.js';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);

// Display available routes
app.get('/', (req, res) => {
    res.json(
        {
            routes: [
                '/api/employees/',
                '/api/employees/:id',
                '/api/auth/signup',
            ]
        }
    );
});

db.sync({ force: false })
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/`);
        });
    })
    .catch(err => {
        console.error('Error syncing models:', err);
    });