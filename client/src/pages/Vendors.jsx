import React, { useState } from 'react'
import Badge from './../components/Badge';
import { FaGear } from 'react-icons/fa6';
import { useTitle } from '../hooks/useTitle';

const Vendors = () => {

    useTitle('Vendors')

    const [activeTab, setActiveTab] = useState("all")

    const toggleActive = (tab) => {
        setActiveTab(tab)
    }

    const vendors = [
        { name: 'ABC Company', abbreviation: 'ABC', manager: 'Gabbie Shelber', phone: '(876) 823-2198', email: 'company+email@gmail.com', status: 'Active' },
        { name: '123 Company', abbreviation: '123', manager: 'Maggie Bencher', phone: '(876) 823-3209', email: 'company+123@gmail.com', status: 'Inactive' }
    ]

    return (
        <div className=''>
            <h1 className='text-2xl font-medium'>Vendors</h1>
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
                            <th>Organization Name</th>
                            <th>Abbreviation</th>
                            <th>Manageer Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {vendors.map((vendor, index) => (
                            <tr className='bg-white shadow-sm' key={index}>
                                <td className='flex justify-center items-center'>
                                    <div className='w-8 h-8'>
                                        <img src="https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png" alt=""
                                            className='w-full h-full object-cover' />
                                    </div>
                                </td>
                                <td className=''>{vendor.name}</td>
                                <td className=''>
                                    {/* <span className='inline-block w-2 h-2 bg-green-500 rounded-full'></span> */}
                                    <span className='ml-1 font-bold uppercase'>{vendor.abbreviation}</span>
                                </td>
                                <td className=''>{vendor.manager}</td>
                                <td className=''>{vendor.phone}</td>
                                <td className='text-blue-500'><a href={`mailto:${vendor.email}`}>{vendor.email}</a></td>
                                <td className=''>
                                    <Badge children={vendor.status} status={vendor.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {[...Array(10).keys()].map((index) => (
                    <div className='flex flex-col gap-2 p-6 bg-white shadow-sm border max-w-md'>
                        <div className='flex justify-between items-center'>
                            <div className='px-2 py-1 bg-teal-500 text-white text-xs rounded-sm'>Active</div>
                            <button className='text-gray-400 rounded-full hover:bg-gray-200 px-2 py-2 transition-all duration-300'><FaGear /></button>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='bg-teal-300 w-16 h-16 object-cover rounded'>

                            </div>
                            <div className=''>
                                <h2 className='font-bold text-2xl'>Sophia Chan</h2>
                                <p className='text-sm text-gray-500'>IT Intern</p>
                                <div className='text-md font-semibold text-teal-500'>15 LPA - 25 LPA</div>
                            </div>
                        </div>
                        <div className='mt-3 p-2 bg-gray-100 text-xs text-gray-500'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci maiores provident aut reprehenderit quam quo nobis cum cupiditate dolore deserunt.</p>
                            <div className='flex justify-between'>

                            </div>
                        </div>
                        <div className='flex justify-between gap-2 mt-2'>
                            <button className='w-full rounded-sm px-4 py-3 bg-teal-500 text-white text-sm'>Call</button>
                            <button className='w-full rounded-sm px-4 py-3 bg-blue-500 text-white text-sm'>Resume</button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )


}

export default Vendors