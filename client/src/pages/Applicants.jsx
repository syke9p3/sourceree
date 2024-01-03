import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateApplicant from "../components/UpdateApplicant.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import ApplicantSkeleton from "../components/skeletons/ApplicantSkeleton";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";

const Applicants = () => {

    useTitle('Applicants')

    let navigateTo = useNavigate()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const successMessage = params.get('success');

    const [applicants, setApplicants] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Get the signed user account from the state manager store
    const { signedUser: user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            console.log('User:', user);
            fetchApplicants(user.data.userId);
        }
    }, [user]);

    const fetchApplicants = (userId) => {
        setError(null);
        setLoading(true);

        axios.get(`http://localhost:8080/api/applicants/${userId}`)
            .then(function (response) {
                setApplicants(response.data.reverse());
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setError(error.message || 'An error occurred while fetching applicants.');
                setLoading(false);
            });
    }


    const deleteApplicant = (applicantId) => {
        axios.delete(`http://localhost:8080/api/applicants/${applicantId}`)
            .then(function () {
                fetchApplicants(user.data.userId); 
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleEdit = (applicant) => {
        // Set the selected applicant for update
        setSelectedApplicant(applicant);
        console.log(`Handle edit selected applicant ${selectedApplicant}`)
    };

    const handleUpdateApplicant = () => {
        setSelectedApplicant(null);
        fetchApplicants(user.data.userId);
    };

    const [menuOpen, setMenuOpen] = useState(null);

    const toggleMenu = (index) => {
        setMenuOpen((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="m-2">
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-2xl font-medium'>Applicants</h1>
                {user && (
                    <Link to='/create/applicant'>
                        <button className="bg-teal-600 font-semibold text-white px-12 py-3 my-2 text-sm rounded-md shadow-sm hover:bg-teal-700" type="submit">
                            + Add Applicant
                        </button>
                    </Link>
                )
                }
            </div>

            {successMessage && (
                <div className="bg-green-200 text-teal-800 p-2 m-2">
                    {successMessage}
                </div>
            )}

            {/* <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton /> */}



            {error && (
                <div className="flex h-[calc(50vh-40px)] items-center justify-center p-5 w-full">
                    <div className="text-center">
                        <div className="inline-flex rounded-full bg-red-100 p-3">
                            <div className="rounded-full stroke-red-600 bg-red-200 p-3">
                                <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 16L22 21M22 16L17 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </div>
                        <h1 className="mt-5 text-xl font-bold text-slate-800">500 - Server error</h1>
                        <p className="text-slate-600 mt-3 text-sm">Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem presists.</p>
                    </div>
                </div>
            )}

            <ul>
                {applicants.map((applicant) => (
                    <li key={applicant.id} className="bg-white shadow-sm my-4 border-solid border p-6 flex justify-between"> {/* onClick={() => {navigateTo(`/applicant/${applicant.id}`)}} */}
                        <div>
                            <h3 className="font-bold">{applicant.firstName} {applicant.lastName} </h3>
                            <span className="text-sm text-gray-500">{applicant.email}</span>
                            <p>{applicant.clientCompany} ({applicant.clientCompanySite})</p>
                            <p>{applicant.applicantStatus}</p>
                            <br />
                            {user && <>
                                <button className="bg-yellow-500 font-bold text-white p-3  text-sm mt-2"
                                    onClick={() => handleEdit(applicant)}>

                                    <span className="flex gap-2 items-center">
                                        <FaPencilAlt size={16} />
                                        Edit
                                    </span>
                                </button>
                                <button className="bg-red-500 font-bold text-white p-3 ml-1 text-sm mt-2"
                                    onClick={() => deleteApplicant(applicant.id)}>
                                    <span className="flex gap-2 items-center">
                                        <FaTrash size={16} />
                                        Delete
                                    </span>
                                </button>
                            </>}
                        </div>

                        {selectedApplicant && selectedApplicant.id == applicant.id && (
                            <UpdateApplicant
                                key={selectedApplicant.id}
                                applicant={selectedApplicant}
                                onUpdateApplicant={handleUpdateApplicant}
                            />
                        )}
                    </li>
                ))}
            </ul>

            <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {applicants.map((applicant, index) => (
                    <div className='flex flex-col gap-2 p-6 bg-white shadow-sm border max-w-md'>
                    <div className='flex justify-between items-center'>
                        <div className='px-2 py-1  bg-teal-500 text-white text-xs rounded-sm'>{applicant.applicantStatus}</div>
                        <button onClick={() => toggleMenu(index)} className='text-gray-400 rounded-full hover:bg-gray-200 px-2 py-2 transition-all duration-300 relative'>
                            <BsThreeDots />
                            {menuOpen === index && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <ul className="py-1 " role="none">
                                        <li
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                        >
                                            <FaPencilAlt />
                                            Edit
                                        </li>
                                        <li
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                                            role="menuitem"
                                        >
                                            <FaTrash />
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='bg-teal-300 w-16 h-16 object-cover flex flex-shrink-0 rounded'>
    
                        </div>
                        <div className=''>
                            <h2 className='font-bold text-xl'>{applicant.firstName} {applicant.lastName}</h2>
                            <p className='text-sm text-gray-500'>IT Intern</p>
                            <div className='text-md font-semibold text-teal-500'>{applicant.clientCompany} ({applicant.clientCompanySite})</div>
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
                ))}
            </div>
        </div>
    )
}

export default Applicants





// import React, { useState } from 'react'

// const Applicants = () => {

//     const [activeTab, setActiveTab] = useState("all")

//     const toggleActive = (tab) => {
//         setActiveTab(tab)
//     }

//     return (
//         <div className=''>
//             <h1 className='text-2xl font-medium'>Applicants</h1>
//             <div className='text-sm bg-slate-50 my-6 p-3 shadow-sm'>
//                 <div className='flex gap-2'>
//                     <button className={`cursor-pointer rounded px-4 py-2 font-medium 
//                         ${activeTab === 'all' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("all")}>Show All</button>
//                     <button className={`cursor-pointer rounded px-4 py-2 font-medium 
//                         ${activeTab === 'leads' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("leads")}>Leads</button>
//                     <button className={`cursor-pointer rounded px-4 py-2 font-medium
//                         ${activeTab === 'apps' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("apps")}>Apps</button>
//                     <button className={`cursor-pointer rounded px-4 py-2 font-medium
//                         ${activeTab === 'calls' ? "text-white bg-blue-500" : ''}`} onClick={() => toggleActive("calls")}>Calls</button>
//                 </div>
//                 <div>
                    
//                 </div>
//             </div>

//             <table className='w-full table-auto border-separate border-spacing-y-2'>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Type</th>
//                         <th>Applicant Name</th>
//                         <th>Phone</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody className=''>
//                     {[...Array(5).keys()].map((index) => (
//                         <tr className='bg-white' key={index}>
//                             <td className=''>9/16/23</td>
//                             <td className='flex items-center gap-2'>
//                                 <span className='w-2 h-2 bg-green-500 rounded-full'></span>
//                                 <span className='font-bold uppercase'>Lead</span>
//                             </td>
//                             <td className=''>Gabie Sheber</td>
//                             <td className=''>(876) 823-2198</td>
//                             <td className=''>Call Scheduled</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Applicants