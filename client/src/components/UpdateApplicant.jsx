import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useSelector } from 'react-redux';

const UpdateApplicant = ({ applicant, onUpdateApplicant }) => {

    console.log(`To be edited: ${applicant}`)
    const { signedUser: User } = useSelector(state => state.auth)

    const currentYear = new Date().getFullYear();
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [sex, setSex] = useState([]);
    const [civilstatus, setCivilStatus] = useState([]);
    const [education, setEducation] = useState([]);

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

        const educationArray = [
            'Elementary Graduate', 'High School Graduate', 'High School Undergraduate', 'College Graduate',
            'College Undergraduate', "Master's Degree", "Vocational"
        ];
        setEducation(educationArray);
    }, []);


    const initialValues = {
        firstName: applicant.firstName,
        middleName: applicant.middleName,
        lastName: applicant.lastName,
        birthMonth: applicant.birthMonth,
        birthDay: applicant.birthDay,
        birthYear: applicant.birthYear,
        age: applicant.age,
        civilStatus: applicant.civilStatus,
        sex: applicant.sex,
        contact: applicant.contact,
        email: applicant.email,
        altEmail: applicant.altEmail,
        homeAddress: applicant.homeAddress,
        highestEducationalAttainment: applicant.highestEducationalAttainment,
        lastSchoolAttended: applicant.lastSchoolAttended,
        bpoExpYears: applicant.bpoExpYears,
        bpoExpPosition: applicant.bpoExpPosition,
        endorsementDate: applicant.endorsementDate,
        interviewTime: applicant.interviewTime,
        userId: User.data.userId ? User.data.userId : '', 
    }

    const applicantSchema = Yup.object().shape({
        firstName: Yup.string().required('*First Name is required'),
        middleName: Yup.string().required('*Middle Name is required'),
        lastName: Yup.string().required('*Last Name is required'),
        birthMonth: Yup.string().required('*Birth Month is required'),
        birthDay: Yup.number().required('*Birth Day is required'),
        birthYear: Yup.number().required('*Birth Year is required'),
        age: Yup.number().required('*Age is required'),
        civilStatus: Yup.string()
            .required('*Civil Status is required'),
        sex: Yup.string()
            .required('*Sex is required'),
        contact: Yup.number().required('*Contact is required'),
        email: Yup.string().email('*Invalid email').required('*Email is required'),
        altEmail: Yup.string().email('*Invalid email').required('*Alternate Email is required'),
        homeAddress: Yup.string().required('*Home Address is required'),
        highestEducationalAttainment: Yup.string().required('*Required'),
        lastSchoolAttended: Yup.string().required('*Last School Attended is required'),
        bpoExpYears: Yup.number().required('*BPO Experience Years is required'),
        bpoExpPosition: Yup.string().required('*BPO Experience Position is required'),
        endorsementDate: Yup.date().required('*Endorsement Date is required'),
        interviewTime: Yup.string().required('*Interview Time is required'),
        userId: Yup.number(),
    });

    const onSubmit = (updatedApplicantData) => {
        axios.put(`http://localhost:8080/api/applicants/${applicant.id}`, updatedApplicantData)
            .then(response => {
                console.log('Applicant updated:', response.data);
                // Call the callback function to notify the parent of the update
                onUpdateApplicant();
            })
            .catch(error => {
                console.error('Error updating applicant:', error);
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            <div className="bg-white p-6 shadow-lg rounded-lg max-h-full max-w-screen-sm overflow-y-auto" style={{ maxWidth: '400px' }}>
                <h3 className="font-bold text-2xl my-6 mb-8">Update Applicant Form</h3>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={applicantSchema}>
                <Form>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                            <ErrorMessage 
                                name="firstName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="firstName" 
                                placeholder="John" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name</label>
                            <ErrorMessage 
                                name="middleName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="middleName" 
                                placeholder="Doe" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                            <ErrorMessage 
                                name="lastName" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="lastName" 
                                placeholder="Smith" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                    </div>
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
                        <label htmlFor="contact">Contact</label>
                            <ErrorMessage 
                                name="contact" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="contact"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                    </div>
                    <div>
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
                    <div>
                        <label htmlFor="altEmail">Alternative Email</label>
                        <ErrorMessage 
                            name="altEmail" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="altEmail" 
                            type="email"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div>
                        <label htmlFor="homeAddress">Home Address</label>
                        <ErrorMessage 
                            name="homeAddress" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="homeAddress"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div>
                        <label htmlFor="highestEducationalAttainment">Highest Educational Attainment</label>
                        <ErrorMessage 
                            name="highestEducationalAttainment" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="highestEducationalAttainment" 
                            as="select"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            >
                            <option value="">Select Educational Attainment</option>
                            {education.map((education) => (
                                <option key={education} value={education}>{education}</option>
                            ))}
                        </Field>
                    </div>
                    <div>
                        <label htmlFor="lastSchoolAttended">Last School Attended</label>
                        <ErrorMessage 
                            name="lastSchoolAttended" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="lastSchoolAttended"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div>
                        <label htmlFor="bpoExpYears">Total BPO Experience in Years</label>
                        <ErrorMessage 
                            name="bpoExpYears" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="bpoExpYears" 
                            type="number"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div>
                        <label htmlFor="bpoExpPosition">Position</label>
                        <ErrorMessage 
                            name="bpoExpPosition" 
                            component="span" 
                            className='text-red-500 ml-2 text-xs' />
                        <Field 
                            name="bpoExpPosition"
                            className="bg-gray-50 border border-solid w-full p-2 my-2" 
                            />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button className="bg-yellow-500 hover:bg-yellow-700 font-bold text-white rounded p-2 transition-colors duration-300" type="submit">Update Applicant</button>
                        <button className="bg-gray-500 hover:bg-gray-700 font-bold text-white rounded p-2 transition-colors duration-300" onClick={(e) => onUpdateApplicant()}>Cancel</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    );
};

export default UpdateApplicant;
