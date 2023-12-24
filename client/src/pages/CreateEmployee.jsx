import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';

const CreateEmployee = () => {

    let navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const initialValues = {
        name: '',
        email: '',
        department: '',
        position: '',
        salary: '',
    }

    const employeeSchema = Yup.object().shape({
        name: Yup.string().required('*Name is required'),
        email: Yup.string().email('*Invalid email').required('*Email is required'),
        department: Yup.string().required('*Department is required'),
        position: Yup.string().required('*Position is required'),
        salary: Yup.number().required('*Salary is required').positive('Salary must be positive').nullable(),
    });

    const onSubmit = (employeeData) => {
        setLoading(true)
        axios.post('http://localhost:8080/api/employees', employeeData)
            .then(response => {
                console.log('Employee created:', response.data);
                navigateTo(`/?success=${response.data}`)
                setLoading(false)

            })
            .catch(error => {
                console.error('Error adding employee:', error);
                setError(error)
                setLoading(false)
            });
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={employeeSchema}>
                <Form className='max-w-md border-2 border-solid shadow-lg flex flex-col gap-2 mx-auto p-6 bg-white'>
                    <h3 className="font-bold text-xl my-4">Create Employee Form</h3>
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
                            className="bg-gray-50 border border-solid w-full p-2 my-2" />
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
                    <button className="bg-green-600 font-bold text-white rounded p-2 m-2 disabled:opacity-80 " disabled={loading} type="submit">
                        {loading ?
                            <p className='font-normal'><Spinner /> Loading...</p>
                            : <p>+ Create Employee</p>}
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateEmployee;

// const CreateEmployee = () => {
//     const [employeeData, setEmployeeData] = useState({
//         name: '',
//         email: '',
//         department: '',
//         position: '',
//         salary: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEmployeeData({
//             ...employeeData,
//             [name]: value,
//         });
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         // Perform validation if needed

//         // Send the data to the server (you may want to replace the URL)
//         axios.post('http://localhost:8080/api/employees', employeeData)
//             .then(response => {
//                 console.log('Employee created:', response.data);

//                 setEmployeeData({
//                     name: '',
//                     email: '',
//                     department: '',
//                     position: '',
//                     salary: '',
//                 });

//             })
//             .catch(error => {
//                 console.error('Error adding employee:', error);
//             });
//     };

//     return (
//         <div>
//             <h3 className="font-bold">Create Employee Form</h3>
//             <form onSubmit={handleFormSubmit}>
//                 <label>
//                     Name:
//                     <input className="border border-solid" type="text" name="name" value={employeeData.name} onChange={handleInputChange} />
//                 </label>
//                 <br />
//                 <label>
//                     Email:
//                     <input className="border border-solid" type="email" name="email" value={employeeData.email} onChange={handleInputChange} />
//                 </label>
//                 <br />
//                 <label>
//                     Department:
//                     <input className="border border-solid" type="text" name="department" value={employeeData.department} onChange={handleInputChange} />
//                 </label>
//                 <br />
//                 <label>
//                     Position:
//                     <input className="border border-solid" type="text" name="position" value={employeeData.position} onChange={handleInputChange} />
//                 </label>
//                 <br />
//                 <label>
//                     Salary:
//                     <input className="border border-solid" type="number" name="salary" value={employeeData.salary} onChange={handleInputChange}></input>
//                 </label>
//                 <br />
//                 <button className="bg-green-600 font-bold text-white rounded p-2 m-2" type="submit">+ Create Employee</button>
//             </form>
//         </div>
//     );
// };

