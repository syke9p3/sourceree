import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import UpdateApplicant from "../components/UpdateApplicant.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCalendar, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import ApplicantSkeleton from "../components/skeletons/ApplicantSkeleton";
import Interviewees from './../components/Interviewees';

const Home = () => {

    useTitle('Dashboard')

    // Get the signed user account from the state manager store
    const { signedUser: User } = useSelector(state => state.auth)

    let navigateTo = useNavigate()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const successMessage = params.get('success');

    const [applicants, setApplicants] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <div className="m-2 ">
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-2xl font-medium'>Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-start">
                {[...Array(1).keys()].map((index) => (
                    <div key={index} className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center flex-shrink-0" >
                            <FaCalendar className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-500">84</h2>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Applicants</p>
                        </div>
                    </div>
                ))}

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-cyan-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-cyan-500">26</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Pending</p>
                    </div>
                </div>

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-teal-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-teal-500">33</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Passed</p>
                    </div>
                </div>

                <div className=" bg-white p-6 rounded-md shadow-sm border border-gray-200 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center flex-shrink-0" >
                        <FaCalendar className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-red-500">25</h2>
                        <p className='text-xs text-gray-500 font-semibold uppercase'>Rejected</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 shadow-sm border flex flex-col max-h-[600px]" >
                    <Tasks />
                </div>
                <div className="bg-white p-6 shadow-sm border flex flex-col col-span-2 overflow-x-auto">
                    <Interviewees />
                </div>
            </div>
        </div>


    )
}

export default Home

const Tasks = () => {
    return (
        <>
            <h3 className="uppercase font-semibold text-gray-500 pb-3">My Tasks</h3>
            <ul className="flex-1  overflow-y-auto">
                {[...Array(12).keys()].map((task, index) => (
                    <li className="py-6 text-gray-500 border-y" key={index}>
                        <p>Meeting with candidate at 2pm who applied for Marketing Manager at Jolibee.</p>
                        <div className="flex justify-between items-center mt-3">
                            <div className="text-sm py-1 px-2 font-semibold bg-green-200 text-green-500">
                                High Priority
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1 "><FaPencilAlt /></button>
                                <button className="p-1 "><FaTrash /></button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex flex-col">
                <input type="text" className=" rounded bg-gray-100 px-2 py-3 text-sm text-gray-500 focus:outline-none focus:ring focus:border-blue-300" />

                <button className="mt-2 px-2 py-3 bg-teal-500 text-white font-semibold rounded-md">+ Add New Task</button>
            </div>
        </>
    )
}

