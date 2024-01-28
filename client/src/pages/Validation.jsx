import React, { useState } from 'react'
import { useTitle } from '../hooks/useTitle';
import Badge from './../components/Badge';
import { Link } from "react-router-dom";

const Validation = () => {

    useTitle('Validation')

    const [activeTab, setActiveTab] = useState("all")

    const toggleActive = (tab) => {
        setActiveTab(tab)
    }

    const applicant = [
        { date: '01/03/24', recruiter: 'Aliana', name: 'Gabbie Shelber', phone: '(876) 823-2198', email: 'gabbieshelber@gmail.com', status: 'Engaged' },
        { date: '01/03/24', recruiter: 'Macky', name: 'Maggie Bencher', phone: '(876) 823-3209', email: 'maggiebencher@gmail.com', status: 'Engaged' }
    ]

    return (
        <div className=''>
            <style>
                    {`
                    .tooltip::before {
                        content: attr(data-tooltip);
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: #000;
                        color: #fff;
                        padding: 8px;
                        border-radius: 3px;
                        opacity: 0;
                        z-index: 1;
                        visibility: hidden;
                        transition: opacity 0.3s ease;
                        font-size: 11px; 
                        max-width: 200px;
                        line-height: 1.2; 
                    }

                    .tooltip:hover::before {
                        opacity: 1;
                        visibility: visible;
                    }

                    .tooltip {
                        position: relative;
                        cursor: pointer;
                    }
                    `}
            </style>
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-2xl font-medium'>Validation</h1>
                <Link to='/create/tally'>
                    <button className="bg-teal-600 font-semibold text-white px-12 py-3 my-2 text-sm rounded-md shadow-sm hover:bg-teal-700" type="submit">
                        Generate Tally
                    </button>
                </Link>
            </div>
            <div>
                <p className="text-m font-small">
                To avoid duplicated applicants among recruiters, automatic scanning
                is used. It will also show the eligibility status of the applicant,
                whether it's{' '}
                <span
                    className="tooltip inline-block relative font-bold"
                    data-tooltip="Applicants that are endorsed no less than 30 days upon their interview."
                >
                    engaged
                </span>{' '}
                or{' '}
                <span
                    className="tooltip inline-block relative font-bold"
                    data-tooltip="Applicants that are endorsed beyond 30 days upon their interview."
                >
                    expired
                </span>
                .
                </p>
            </div>
            <div className='text-sm bg-slate-50 my-6 p-3 shadow-sm'>
                <div className='flex gap-2'>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'all' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("all")}>Show All</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'engaged' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("engaged")}>Engaged</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'expired' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("expired")}>Expired</button>
                </div>
                <div>
                    
                </div>
            </div>

            <table className='w-full table-auto border-separate border-spacing-y-2'>
                <thead>
                    <tr>
                        <th>Endorsement Date</th>
                        <th>Recruiter</th>
                        <th>Applicant Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Eligibility Status</th>
                    </tr>
                </thead>
                <tbody className=''>
                        {applicant.map((applicant, index) => (
                            <tr className='bg-white shadow-sm' key={index}>
                                <td className=''>{applicant.date}</td>
                                <td className=''>
                                    {/* <span className='inline-block w-2 h-2 bg-green-500 rounded-full'></span> */}
                                    <span className='ml-1 font-bold uppercase'>{applicant.recruiter}</span>
                                </td>
                                <td className=''>{applicant.name}</td>
                                <td className=''>{applicant.phone}</td>
                                <td className='text-blue-500'><a href={`mailto:${applicant.email}`}>{applicant.email}</a></td>
                                <td className=''>
                                    <Badge children={applicant.status} status={applicant.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default Validation