import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Employee = () => {

    let { id } = useParams()

    const [employee, setEmployee] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/api/employees/${id}`)
            .then(function (response) {
                setEmployee(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <div>
            {/* <h3 classNameName="font-bold">{employee.name}</h3>
            <span classNameName="text-sm text-gray-500">{employee.email}</span>
            <p>{employee.department} ({employee.position})</p>
            <p>${employee.salary}</p>
            <button classNameName="bg-yellow-500 font-bold text-white rounded-sm p-2 text-sm my-2" onClick={() => handleEdit(employee)}>Edit</button>
            <button classNameName="bg-red-500 font-bold text-white rounded-sm p-2 text-sm my-2" onClick={() => deleteEmployee(employee.id)}>Delete</button> */}
            <div className="bg-indigo-50 h-screen">
                <nav>
                    <div className="w-full bg-gradient-to-tr from-indigo-600 to-purple-600 py-4">
                        <h1 className="text-center text-indigo-100 text-xl font-bold">EMPLOYEE { employee.id }</h1>
                    </div>
                </nav>
                <div className="px-10 mt-10">
                    <div className="bg-white rounded-md max-w-4xl mx-auto p-4 space-y-4 shadow-lg">
                        <h3 className="mb-2 pt-3 font-semibold">Name: <span className="font-thin">{ employee.name }</span></h3>
                        <h3 className="border-t mb-2 pt-3 font-semibold">Email:
                            <span className="font-thin"> { employee.email }</span></h3>
                        <div className="flex justify-end space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 cursor-pointer" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 cursor-pointer"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // </div>
    )
}

export default Employee