import { createConnection } from '../utils/db.js'
import { errorHandler } from '../utils/errorHandler.js'
import { sanitizeEmployeeData } from '../utils/sanitization.js';
import { validateEmployeeData } from '../utils/validation.js';

const db = createConnection()

export const getEmployees = async (req, res, next) => {

    const q = 'SELECT * FROM employees WHERE `salary`'

    db.query(q, (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Error fetching employees` });
        }
        res.json(results);
    });
}

export const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.id; // Extract the employee ID from the request parameters

    const q = 'SELECT * FROM employees WHERE id = ?'; // Assuming 'id' is the column name for employee ID

    db.query(q, [employeeId], (err, results) => {
        if (err) {
            return next(errorHandler(500, 'Error fetching employee'));
        }

        if (results.length === 0) {
            return next(errorHandler(404, 'Employee not found'));
        }

        res.json(results[0]); // Assuming only one employee will be fetched by ID
    });
};

export const createEmployee = async (req, res, next) => {
    const q = "INSERT INTO employees SET ?"
    const { name, email, department, position, salary } = req.body
    const employee = { name, email, department, position, salary };

    // add sanitation and validation

    db.query(q, employee, (err, data) => {
        if (err) return res.json(err)
        return res.json("New employee added successfully.")
    })
}

export const updateEmployee = async (req, res, next) => {
    const employeeId = req.params.id;
    const { name, email, department, position, salary } = req.body;
    const employee = { name, email, department, position, salary };
  
    const q = 'UPDATE employees SET ? WHERE id = ?';
  
    db.query(q, [employee, employeeId], (err, data) => {
      if (err) {
        return next(errorHandler(500, 'Error updating employee'));
      }
  
      if (data.affectedRows === 0) {
        return next(errorHandler(404, 'Employee not found'));
      }
  
      res.json({ message: 'Employee updated successfully' });
    });
  };
  

export const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    const q = "DELETE FROM employees WHERE id = ?";

    db.query(q, [employeeId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting employee' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' })
        }

        res.json({ message: 'Employee deleted successfully' })
    })
}


// export const createEmployee = async (req, res, next) => {
//   try {
//     const employeeData = sanitizeEmployeeData(req.body);
//     const validationErrors = validateEmployeeData(employeeData);

//     if (validationErrors.length > 0) {
//       return res.status(400).json({ errors: validationErrors });
//     }

//     // Check if the email already exists
//     const existingEmployee = db.query('SELECT * FROM employees WHERE email = ?', [employeeData.email]);

//     if (existingEmployee.length > 0) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Validate salary range
//     if (employeeData.salary < 0 || employeeData.salary > 1000000) {
//       return next(errorHandler(400, 'Salary should be between 0 and 1,000,000'));
//     }

//     // Proceed with creating the employee
//     const result = db.query('INSERT INTO employees SET ?', employeeData);

//     res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
//   } catch (error) {
//     return next(errorHandler(500, 'Error creating employee'));
//   }
// };