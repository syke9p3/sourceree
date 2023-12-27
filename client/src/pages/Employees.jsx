import React, { useState } from 'react'

const Employees = () => {

    const [activeTab, setActiveTab] = useState("all")

    const toggleActive = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className=''>
            <h1 className='text-2xl font-medium'>Applicants</h1>
            <div className='text-sm bg-slate-50 my-6 p-3 shadow-sm'>
                <div className='flex gap-2'>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'all' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("all")}>Show All</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium 
                        ${activeTab === 'leads' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("leads")}>Leads</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'apps' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("apps")}>Apps</button>
                    <button className={`cursor-pointer rounded px-4 py-2 font-medium
                        ${activeTab === 'calls' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("calls")}>Calls</button>
                </div>
                <div>
                    
                </div>
            </div>

            <table className='w-full table-auto border-separate border-spacing-y-2'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Applicant Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {[...Array(5).keys()].map((index) => (
                        <tr className='bg-white' key={index}>
                            <td className=''>9/16/23</td>
                            <td className='flex items-center gap-2'>
                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                <span className='font-bold uppercase'>Lead</span>
                            </td>
                            <td className=''>Gabie Sheber</td>
                            <td className=''>(876) 823-2198</td>
                            <td className=''>Call Scheduled</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Employees