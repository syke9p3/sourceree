import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = ({ refetch }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
        salary: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Perform validation if needed


        // Send the data to the server (you may want to replace the URL)
        axios.post('http://localhost:8080/api/employees', employeeData)
            .then(response => {
                console.log('Employee created:', response.data);

                setEmployeeData({
                    name: '',
                    email: '',
                    department: '',
                    position: '',
                    salary: '',
                });

                refetch()

            })
            .catch(error => {
                console.error('Error adding employee:', error);
            });
    };

    return (
        <div>
            <h3 className="font-bold">Create Employee Form</h3>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input className="border border-solid" type="text" name="name" value={employeeData.name} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input className="border border-solid" type="email" name="email" value={employeeData.email} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Department:
                    <input className="border border-solid" type="text" name="department" value={employeeData.department} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Position:
                    <input className="border border-solid" type="text" name="position" value={employeeData.position} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Salary:
                    <input className="border border-solid" type="number" name="salary" value={employeeData.salary} onChange={handleInputChange}></input>
                </label>
                <br />
                <button className="bg-green-600 font-bold text-white rounded p-2 m-2" type="submit">+ Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;