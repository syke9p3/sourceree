import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateEmployee from "../components/UpdateEmployee";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const Home = () => {

    let navigateTo = useNavigate()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const successMessage = params.get('success');

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        axios.get('http://localhost:8080/api/employees')
            .then(function (response) {
                setEmployees(response.data.reverse())
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
        setSelectedEmployee(null);
        fetchEmployees();
    };

    return (
        <div className="m-2">
            <div className="flex justify-between items-center">
                <h1 className='text-3xl font-bold'>Employees</h1>
                <button className="bg-green-600 font-bold text-white p-2 my-2" type="submit">
                    <Link to='/create_employee'>+ Create Employee</Link>
                </button>
            </div>

            {successMessage && (
                <div className="bg-green-200 text-green-800 p-2 m-2">
                    {successMessage}
                </div>
            )}

            <ul>
                {employees.map((employee) => (
                    <li key={employee.id} className="bg-white shadow-sm my-4 border-solid border p-6 flex justify-between"> {/* onClick={() => {navigateTo(`/employee/${employee.id}`)}} */}
                        <div>
                            <h3 className="font-bold">{employee.name}</h3>
                            <span className="text-sm text-gray-500">{employee.email}</span>
                            <p>{employee.department} ({employee.position})</p>
                            <p>${employee.salary}</p>
                            <br />
                            <button className="bg-yellow-500 font-bold text-white p-3  text-sm mt-2"
                                onClick={() => handleEdit(employee)}>
                                
                                <span className="flex gap-2 items-center"> 
                                <FaPencilAlt size={16}/>
                                    Edit
                                </span>
                            </button>
                            <button className="bg-red-500 font-bold text-white p-3 ml-1 text-sm mt-2"
                                onClick={() => deleteEmployee(employee.id)}>
                                <span className="flex gap-2 items-center"> 
                                    <FaTrash size={16}/> 
                                    Delete
                                </span>
                            </button>
                        </div>

                        {selectedEmployee && selectedEmployee.id == employee.id && (
                            <UpdateEmployee
                                key={selectedEmployee.id}
                                employee={selectedEmployee}
                                onUpdateEmployee={handleUpdateEmployee}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
