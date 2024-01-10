import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useTitle } from '../hooks/useTitle';
import { useSelector } from 'react-redux';

const ProfileSettings = ({ user, onUpdateUser }) => {

    useTitle('Profile Settings')

    const { signedUser: User } = useSelector(state => state.auth)
    console.log(User.data.userId)

    const currentYear = new Date().getFullYear();
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [sex, setSex] = useState([]);
    const [civilstatus, setCivilStatus] = useState([]);

    useEffect(() => {
        const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
        setDays(daysArray);

        const monthsArray = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        setMonths(monthsArray);

        const yearsArray = Array.from({ length: 100 }, (_, i) => currentYear - i);
        setYears(yearsArray);

        const sexArray = [
            "Male", "Female", "Preferred not to disclose"
        ];
        setSex(sexArray);

        const civilStatusArray = [
            'Single', 'Married', 'Divorced', 'Widowed'
        ];
        setCivilStatus(civilStatusArray);
    }, []);

    let navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        birthMonth: '',
        birthDay: '',
        birthYear: '',
        age: '',
        civilStatus: '',
        sex: '',
        contact: '',
        email: '',
        password: '',
        userId: User.data.userId ? User.data.userId : '', 
    }

    const onSubmit = (updatedUserData) => {
        axios.put(`http://localhost:8080/api/users/`, updatedUserData)
            .then(response => {
                console.log('User updated:', response.data);
                // Call the callback function to notify the parent of the update
                onUpdateUser();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className='max-w-4xl border-2 border-solid shadow-lg flex flex-col gap-2 mx-auto p-6 bg-white'>
                    <h3 className="font-bold text-xl my-4">Update Profile</h3>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="userId">Recruiter ID</label>
                            <ErrorMessage 
                                name="userId" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="userId"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                disabled
                                />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="firstName">First Name</label>
                            <ErrorMessage 
                                name="firstName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="firstName" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="middleName">Middle Name</label>
                            <ErrorMessage 
                                name="middleName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="middleName" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="lastName">Last Name</label>
                            <ErrorMessage 
                                name="lastName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="lastName" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="birthMonth">Birth Month</label>
                            <ErrorMessage 
                                name="birthMonth" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                             <Field 
                                name="birthMonth" 
                                as="select" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            >
                                <option value="">Select Month</option>
                                {months.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="birthDay">Birth Day</label>
                            <ErrorMessage 
                                name="birthDay" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="birthDay" 
                                as="select" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2"
                            >
                                <option value="">Select Day</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="birthYear">Birth Year</label>
                            <ErrorMessage 
                                name="birthYear" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="birthYear" 
                                as="select" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2"
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Field>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="age">Age</label>
                            <ErrorMessage 
                                name="age" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="age" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="civilStatus">Civil Status</label>
                            <ErrorMessage 
                                name="civilStatus" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="civilStatus" 
                                as="select"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                >
                                <option value="">Select Civil Status</option>
                                {civilstatus.map((civilstatus) => (
                                    <option key={civilstatus} value={civilstatus}>{civilstatus}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="sex">Sex</label>
                            <ErrorMessage 
                                name="sex" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="sex" 
                                as="select"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                >
                                <option value="">Select Sex</option>
                                {sex.map((sex) => (
                                    <option key={sex} value={sex}>{sex}</option>
                                ))}
                            </Field>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="contact">Contact Number</label>
                            <ErrorMessage 
                                name="contact" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="contact" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="email">Email</label>
                            <ErrorMessage 
                                name="email" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="email" 
                                type="email"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button className="bg-yellow-500 font-bold text-white rounded p-2 " type="submit">Update Changes</button>
                        <button className="bg-gray-500 font-bold text-white rounded p-2 " onClick={(e) => onUpdateUser()}>Cancel</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );

};

export default ProfileSettings;

