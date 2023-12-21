import { useState } from "react";
import axios from 'axios';

const UpdateEmployee = ({ employee, onUpdateEmployee, refetch }) => {

    console.log(`To be edited: ${employee}`)

    const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployeeData({
            ...updatedEmployeeData,
            [name]: value,
        });
    };

    const handleUpdateEmployee = (e) => {
        e.preventDefault();
        // Send a PUT request to update the employee
        axios.put(`http://localhost:8080/api/employees/${employee.id}`, updatedEmployeeData)
            .then(response => {
                console.log('Employee updated:', response.data);
                // Call the callback function to notify the parent of the update
                onUpdateEmployee();
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });
    };

    return (
        <div>
            <h3 className="font-bold">Update Employee Form</h3>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={updatedEmployeeData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={updatedEmployeeData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={updatedEmployeeData.department}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Position:
                    <input
                        type="text"
                        name="position"
                        value={updatedEmployeeData.position}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={updatedEmployeeData.salary}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button className="bg-blue-500 font-bold text-white rounded p-2 m-2" onClick={(e) => handleUpdateEmployee(e)}>Update Employee</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
