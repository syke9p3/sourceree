import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'playground'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Capture the available routes
            routes.push({
                method: Object.keys(middleware.route.methods)[0].toUpperCase(),
                path: middleware.route.path,
            });
        }
    });
    res.json({ routes });
});

// GET all employees
app.get('/employees', (req, res) => {

    const query = 'SELECT * FROM employees'

    mysqlConnection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employees: ', err);
            res.status(500).json({ error: 'Error fetching employees' });
            return;
        }
        res.json(results);
    });
});

// POST a new employee
app.post('/employees', (req, res) => {
    const { name, email, department, position, salary } = req.body;
    const employee = { name, email, department, position, salary };

    mysqlConnection.query('INSERT INTO employees SET ?', employee, (err, result) => {
        if (err) {
            console.error('Error creating employee: ', err);
            res.status(500).json({ error: 'Error creating employee' });
            return;
        }
        res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});