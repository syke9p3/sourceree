import { useState } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const UpdateApplicant = ({ applicant, onUpdateApplicant }) => {

    console.log(`To be edited: ${applicant}`)

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
