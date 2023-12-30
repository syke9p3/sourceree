import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const UpdateApplicant = ({ applicant, onUpdateApplicant }) => {

    console.log(`To be edited: ${applicant}`)

    const currentYear = new Date().getFullYear();
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [sex, setSex] = useState([]);
    const [civilstatus, setCivilStatus] = useState([]);
    const [education, setEducation] = useState([]);
    const [applicantstatus, setApplicantStatus] = useState([]);

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

        const applicantStatusArray = [
            'Active-Pending', 'Active-Valid', 'Active-Invalid', 'Inactive-Invalid'
        ];
        setApplicantStatus(applicantStatusArray);
    }, []);


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
        altEmail: '',
        homeAddress: '',
        highestEducationalAttainment: '',
        lastSchoolAttended: '',
        bpoExpYears: '',
        bpoExpPosition: '',
        endorsementDate: '',
        interviewTime: '',
        clientCompany: '',
        clientCompanySite: '',
        applicantStatus: '',
        agencyRemarks: '',
        clientCompanyRemarks: '',
        resume: null, 
        userId: '', 
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
        clientCompany: Yup.string().required('*Client Company is required'),
        clientCompanySite: Yup.string().required('*Client Company Site is required'),
        applicantStatus: Yup.string().required('*Applicant Status is required'),
        agencyRemarks: Yup.string().required('*N/A for Initial Processing'),
        clientCompanyRemarks: Yup.string().required('*N/A for Initial Processing'),
        resume: Yup.mixed()
            .required('*Resume is required'),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg">
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
                    <div className="flex justify-end gap-2 mt-6">
                        <button className="bg-yellow-500 font-bold text-white rounded p-2 " type="submit">Update Applicant</button>
                        <button className="bg-gray-500 font-bold text-white rounded p-2 " onClick={(e) => onUpdateApplicant()}>Cancel</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    );
};

export default UpdateApplicant;
