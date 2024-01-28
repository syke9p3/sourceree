import React, { useState } from 'react'
import Badge from './../components/Badge';
import { FaCalendar, FaGear } from 'react-icons/fa6';
import { useTitle } from '../hooks/useTitle';

const Vendors = () => {

    useTitle('Vendors')

    const [activeTab, setActiveTab] = useState("all")

    const toggleActive = (tab) => {
        setActiveTab(tab)
    }

    const applicant = [
        { site: 'Aura', recruiter: 'Aliana', name: 'Gabbie Shelber', phone: '(876) 823-2198', email: 'gabbieshelber@gmail.com', status: 'Passed' },
        { site: 'Baguio', recruiter: 'Macky', name: 'Maggie Bencher', phone: '(876) 823-3209', email: 'maggiebencher@gmail.com', status: 'Rejected' }
    ]

    return (
        <div className=''>
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-2xl font-medium'>Vendors</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-start">
                {[...Array(1).keys()].map((index) => (
                    <div key={index} className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center flex-shrink-0" >
                            <FaCalendar className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-500">84</h2>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Company 1</p>
                        </div>
                    </div>
                ))}

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-cyan-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-cyan-500">26</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Company 2</p>
                    </div>
                </div>

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-teal-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-teal-500">33</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Company 3</p>
                    </div>
                </div>

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-red-500">25</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Company 4</p>
                    </div>
                </div>
            </div>
            <div className='text-sm bg-slate-50 my-6 p-3 shadow-sm'>
                <div className='flex gap-2'>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'all' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("all")}>Show All</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'company1' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("company1")}>Company 1</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'company2' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("company2")}>Company 2</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'company3' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("company3")}>Company 3</button>
                        <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'company4' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("company4")}>Company 4</button>
                </div>
                <div>

                </div>
            </div>

            <div className="bg-white p-4">
                <table className='w-full table-auto border-separate border-spacing-y-2'>
                    <thead className=''>
                        <tr className=''>
                            <th></th>
                            <th>Site</th>
                            <th>Recruiter</th>
                            <th>Applicant Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Application Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {applicant.map((applicant, index) => (
                            <tr className='bg-white shadow-sm' key={index}>
                                <td className='flex justify-center items-center'>
                                    <div className='w-8 h-8'>
                                        <img src="https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png" alt=""
                                            className='w-full h-full object-cover' />
                                    </div>
                                </td>
                                <td className=''>{applicant.site}</td>
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
        </div>
    )


}

export default Vendors