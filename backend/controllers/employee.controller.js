import Employee from '../models/Employee.js';
import { connectToMySQL } from '../utils/db.js'
import { errorHandler } from '../utils/errorHandler.js'
import { sanitizeEmployeeData } from '../utils/sanitization.js';
import { validateEmployeeData } from '../utils/validation.js';

const db = connectToMySQL()

// export const getEmployees = async (req, res, next) => {
//     const q = 'SELECT * FROM employees'
//     db.query(q, (err, results) => {
//         if (err) {
//             console.error('Error fetching employees:', err);
//             return res.status(500).json({ error: `Error fetching employees` });
//         }
//         res.json(results);
//     });
// }

export const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll(); // same as 'SELECT * FROM employees'
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
};

// export const getEmployeeById = async (req, res, next) => {
//     const employeeId = req.params.id; // Extract the employee ID from the request parameters

//     const q = 'SELECT * FROM employees WHERE id = ?'; // Assuming 'id' is the column name for employee ID

//     db.query(q, [employeeId], (err, results) => {
//         if (err) {
//             return next(errorHandler(500, 'Error fetching employee'));
//         }

//         if (results.length === 0) {
//             return next(errorHandler(404, 'Employee not found'));
//         }

//         res.json(results[0]); // Assuming only one employee will be fetched by ID
//     });
// };

export const getEmployeeById = async (req, res, next) => {
    try {
      const employeeId = req.params.id; // Extract the ID from request parameters
      const employee = await Employee.findByPk(employeeId); //same as 'SELECT * FROM employees WHERE id = ?'
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.json(employee);
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      res.status(500).json({ error: 'Error fetching employee by ID' });
    }
  };

// export const createEmployee = async (req, res, next) => {
//     const q = "INSERT INTO employees SET ?"
//     const { name, email, department, position, salary } = req.body
//     const employee = { name, email, department, position, salary };

//     // add sanitation and validation

//     db.query(q, employee, (err, data) => {
//         if (err) return res.json(err)
//         return res.json("New employee added successfully.")
//     })
// }

export const createEmployee = async (req, res, next) => {
    try {
        const employee = req.body
        await Employee.create(employee)
        res.json("New employee added successfully")
    } catch (error) {
        console.error('Error creating employee', error)
        res.status(500).json("Error creating employee")
    }
}

// export const updateEmployee = async (req, res, next) => {
//     const employeeId = req.params.id;
//     const { name, email, department, position, salary } = req.body;
//     const employee = { name, email, department, position, salary };

//     const q = 'UPDATE employees SET ? WHERE id = ?';

//     db.query(q, [employee, employeeId], (err, data) => {
//         if (err) {
//             return next(errorHandler(500, 'Error updating employee'));
//         }

//         if (data.affectedRows === 0) {
//             return next(errorHandler(404, 'Employee not found'));
//         }

//         res.json({ message: 'Employee updated successfully' });
//     });
// };

export const updateEmployee = async (req, res, next) => {
    try {
      const employeeId = req.params.id;
      const { name, email, department, position, salary } = req.body;
  
      // Find the employee by ID
      const employee = await Employee.findByPk(employeeId);
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Update employee attributes
      employee.name = name;
      employee.email = email;
      employee.department = department;
      employee.position = position;
      employee.salary = salary;
  
      // Save the updated employee to the database
      await employee.save();
  
      res.json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error updating employee', error);
      res.status(500).json({ error: 'Error updating employee' });
    }
  };


// export const deleteEmployee = async (req, res, next) => {
//     const employeeId = req.params.id;

//     const q = "DELETE FROM employees WHERE id = ?";

//     db.query(q, [employeeId], (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error deleting employee' });
//         }

//         if (data.affectedRows === 0) {
//             return res.status(404).json({ error: 'Employee not found' })
//         }

//         res.json({ message: 'Employee deleted successfully' })
//     })
// }


export const deleteEmployee = async (req, res, next) => {
    try {
      const employeeId = req.params.id;
  
      // Find the employee by ID
      const employee = await Employee.findByPk(employeeId);
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Delete the employee
      await employee.destroy();
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee', error);
      res.status(500).json({ error: 'Error deleting employee' });
    }
  };

