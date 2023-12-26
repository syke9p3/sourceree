import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateEmployee from "../components/UpdateEmployee";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import EmployeeSkeleton from "../components/skeletons/EmployeeSkeleton";

const Home = () => {

    useTitle('Dashboard')

    // Get the signed user account from the state manager store
    const { signedUser: User } = useSelector(state => state.auth)

    let navigateTo = useNavigate()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const successMessage = params.get('success');

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        setError(null)
        setLoading(true)
        axios.get('http://localhost:8080/api/employees')
            .then(function (response) {
                setEmployees(response.data.reverse())
                setError(error)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(error)
                setLoading(false)
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
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                {User && (
                    <Link to='/create/employee'>
                        <button className="bg-green-600 font-bold text-white px-3 py-2 my-2 text-sm shadow-md hover:bg-green-700" type="submit">
                            + Add Employee
                        </button>
                    </Link>
                )
                }
            </div>


            {successMessage && (
                <div className="bg-green-200 text-green-800 p-2 m-2">
                    {successMessage}
                </div>
            )}

            {loading && <EmployeeSkeleton />}

            {error && (
                <div className="flex h-[calc(50vh-40px)] items-center justify-center p-5 w-full">
                    <div className="text-center">
                        <div className="inline-flex rounded-full bg-red-100 p-3">
                            <div className="rounded-full stroke-red-600 bg-red-200 p-3">
                                <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 16L22 21M22 16L17 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </div>
                        <h1 className="mt-5 text-xl font-bold text-slate-800">500 - Server error</h1>
                        <p className="text-slate-600 mt-3 text-sm">Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem presists.</p>
                    </div>
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
                            {User && <>
                                <button className="bg-yellow-500 font-bold text-white p-3  text-sm mt-2"
                                    onClick={() => handleEdit(employee)}>

                                    <span className="flex gap-2 items-center">
                                        <FaPencilAlt size={16} />
                                        Edit
                                    </span>
                                </button>
                                <button className="bg-red-500 font-bold text-white p-3 ml-1 text-sm mt-2"
                                    onClick={() => deleteEmployee(employee.id)}>
                                    <span className="flex gap-2 items-center">
                                        <FaTrash size={16} />
                                        Delete
                                    </span>
                                </button>
                            </>}
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
