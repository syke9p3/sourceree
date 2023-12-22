import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateEmployee from "../components/UpdateEmployee";
import { Link, useNavigate  } from "react-router-dom";

const Home = () => {

    let navigateTo = useNavigate()

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        axios.get('http://localhost:8080/api/employees')
            .then(function (response) {
                setEmployees(response.data.reverse())
                console.log(employees)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteEmployee = (employeeId) => {
        axios.delete(`http://localhost:8080/api/employees/${employeeId}`)
            .then(function () {
                fetchEmployees();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleEdit = (employee) => {
        // Set the selected employee for update
        setSelectedEmployee(employee);
        console.log(`Handle edit selected employee ${selectedEmployee}`)
    };

    const handleUpdateEmployee = () => {
        // Clear the selected employee after update
        setSelectedEmployee(null);
        // Fetch employees after update
        fetchEmployees();
    };

    return (
        <div className="m-2">
            <h1 className='text-3xl font-bold text-red-500'>Employees</h1>

            <button className="bg-green-600 font-bold text-white rounded p-2 m-2" type="submit">
                <Link to='/create_employee'>+ Create Employee</Link>
            </button>

            <div>
                {/* Pass the selected employee and update callback to UpdateEmployee */}
                {selectedEmployee && (
                    <UpdateEmployee
                        key={selectedEmployee.id}
                        employee={selectedEmployee}
                        onUpdateEmployee={handleUpdateEmployee}
                    />
                )}
            </div>

            <br />
            <p>List of employees:</p>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id} className="m-2 border-solid border p-2 flex justify-between" onClick={() => {navigateTo(`/employee/${employee.id}`)}}>
                            <div>
                                <h3 className="font-bold">{employee.name}</h3>
                                <span className="text-sm text-gray-500">{employee.email}</span>
                                <p>{employee.department} ({employee.position})</p>
                                <p>${employee.salary}</p>
                                <button className="bg-yellow-500 font-bold text-white rounded-sm p-2 text-sm my-2" onClick={() => handleEdit(employee)}>Edit</button>
                                <button className="bg-red-500 font-bold text-white rounded-sm p-2 text-sm my-2" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
