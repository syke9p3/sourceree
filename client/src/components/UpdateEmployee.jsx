import { useState } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const UpdateEmployee = ({ employee, onUpdateEmployee }) => {

    console.log(`To be edited: ${employee}`)

    const initialValues = {
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
    }

    const employeeSchema = Yup.object().shape({
        name: Yup.string().required('*Name is required'),
        email: Yup.string().email('*Invalid email').required('*Email is required'),
        department: Yup.string().required('*Department is required'),
        position: Yup.string().required('*Position is required'),
        salary: Yup.number().required('*Salary is required').positive('Salary must be positive').nullable(),
    });

    const onSubmit = (updatedEmployeeData) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="font-bold text-2xl my-6 mb-8">Update Employee Form</h3>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={employeeSchema}>
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <ErrorMessage
                            name="name"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="name"
                            placeholder="Example John"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <ErrorMessage name="email"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" />
                    </div>
                    <div>
                        <label htmlFor="department">Department</label>
                        <ErrorMessage name="department"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="department"
                            placeholder="Medical"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div>
                        <label htmlFor="position">Position</label>
                        <ErrorMessage name="position"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="position"
                            placeholder="Nurse"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" />
                    </div>
                    <div>
                        <label htmlFor="salary">Salary</label>
                        <ErrorMessage name="salary"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field name="salary"
                            type="number"
                            placeholder="100"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button className="bg-yellow-500 font-bold text-white rounded p-2 " type="submit">Update Employee</button>
                        <button className="bg-gray-500 font-bold text-white rounded p-2 " onClick={(e) => onUpdateEmployee()}>Cancel</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    );
};

export default UpdateEmployee;
