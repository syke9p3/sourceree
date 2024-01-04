import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useTitle } from '../hooks/useTitle';
import { useSelector } from 'react-redux';

const CreateApplicant = () => {

    useTitle('Add Applicant')

    const { signedUser: User } = useSelector(state => state.auth)
    console.log(User.data.userId)

    const currentYear = new Date().getFullYear();
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [sex, setSex] = useState([]);
    const [civilstatus, setCivilStatus] = useState([]);
    const [education, setEducation] = useState([]);
    const [applicantstatus, setApplicantStatus] = useState([]);
    const [clientcompany, setClientCompany] = useState([]);
    const [sites, setSite] = useState([]);

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
            'Active-Pending', 'Active-Passed', 'Active-Rejected', 'Inactive-Rejected'
        ];
        setApplicantStatus(applicantStatusArray);

        const clientCompanyArray = [
            'Company 1', 'Company 2', 'Company 3', 'Company 4'
        ];
        setClientCompany(clientCompanyArray);

        const siteArray = [
            'Aura', 'Ayala', 'Antipolo', 'Bacolod', 'Baguio', 'CDO', 'Cebu IT Park', 'Davao',
            'EDSA Greenfield', 'Fairview', 'McKinley', 'MOA', 'Rockwell', 'Silver City', 'Sucat'
        ];
        setSite(siteArray);
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
        clientCompany: Yup.string().required('*Client Company is required'),
        clientCompanySite: Yup.string().required('*Client Company Site is required'),
        applicantStatus: Yup.string().required('*Applicant Status is required'),
        agencyRemarks: Yup.string().required('*N/A for Initial Processing'),
        clientCompanyRemarks: Yup.string().required('*N/A for Initial Processing'),
        resume: Yup.mixed()
            .required('*Resume is required'),
        userId: Yup.number().required('*Required'),
    });    

    const onSubmit = (applicantData) => {
        setLoading(true);

        axios.post('http://localhost:8080/api/applicants', applicantData)
            .then(response => {
                console.log('Applicant created:', response.data);
                navigateTo(`/?success=${response.data}`);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error adding applicant:', err);
                setError(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={applicantSchema}>
                <Form className='max-w-6xl border-2 border-solid shadow-lg flex flex-col gap-2 mx-auto p-6 bg-white'>
                    <h3 className="font-bold text-xl my-4">Create Applicant Form</h3>

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
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="endorsementDate">Date of Endorsement</label>
                            <ErrorMessage 
                                name="endorsementDate" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="endorsementDate"
                                type="date"
                                className="bg-gray-50 border border-solid w-full p-2 my-2"
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="interviewTime">Time of Pre-screening Interview</label>
                            <ErrorMessage 
                                name="interviewTime" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="interviewTime" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2"
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
                                placeholder="John" 
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
                                placeholder="Doe" 
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
                                placeholder="Smith" 
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
                        <div className="w-full sm:w-1/4">
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
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/2">
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
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/3">
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
                        <div className="w-full sm:w-1/3">
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
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/3">
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
                        <div className="w-full sm:w-1/3">
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
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="clientCompany">Client Company</label>
                            <ErrorMessage 
                                name="clientCompany" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="clientCompany" 
                                as="select"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                >
                                <option value="">Select Client Company</option>
                                {clientcompany.map((clientcompany) => (
                                    <option key={clientcompany} value={clientcompany}>{clientcompany}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="clientCompanySite">Site</label>
                            <ErrorMessage 
                                name="clientCompanySite" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="clientCompanySite" 
                                as="select"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                >
                                <option value="">Select Site</option>
                                {sites.map((sites) => (
                                    <option key={sites} value={sites}>{sites}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="applicantStatus">Status</label>
                            <ErrorMessage 
                                name="applicantStatus" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="applicantStatus" 
                                as="select"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                >
                                <option value="">Select Status</option>
                                {applicantstatus.map((applicantstatus) => (
                                    <option key={applicantstatus} value={applicantstatus}>{applicantstatus}</option>
                                ))}
                            </Field>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="agencyRemarks">Agency Remarks</label>
                            <ErrorMessage 
                                name="agencyRemarks" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="agencyRemarks" 
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="clientCompanyRemarks">Client Company Remarks</label>
                            <ErrorMessage 
                                name="clientCompanyRemarks" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="clientCompanyRemarks"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                        <div className="w-full sm:w-1/4">
                            <label htmlFor="resume">Resume</label>
                            <ErrorMessage 
                                name="resume" 
                                component="span" 
                                className='text-red-500 ml-2 text-xs' />
                            <Field 
                                name="resume" 
                                type="file"
                                className="bg-gray-50 border border-solid w-full p-2 my-2" 
                                />
                        </div>
                    </div>

                    <button className="bg-green-600 font-bold text-white rounded p-2 m-2 disabled:opacity-80 " disabled={loading} type="submit">
                        {loading ?
                            <p className='font-normal'><Spinner /> Loading...</p>
                            : <p>+ Create Applicant</p>}
                    </button>
                </Form>
            </Formik>
        </div>
    );

};

export default CreateApplicant;

