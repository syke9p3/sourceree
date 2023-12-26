import axios from 'axios';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/users.routes.js'
import employeeRouter from './routes/employees.routes.js'
import db from './sequelize.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
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

app.get('/api/quotes', async (req, res) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/quotes');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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