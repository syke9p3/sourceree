import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateApplicant from "../components/UpdateApplicant.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import Badge from './../components/Badge';
import ApplicantSkeleton from "../components/skeletons/ApplicantSkeleton";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";

const Recruitment = () => {

    useTitle('Recruitment')

    let navigateTo = useNavigate()
    let location = useLocation();
    const params = new URLSearchParams(location.search);

    const { signedUser: user } = useSelector(state => state.auth)

    const [menuOpen, setMenuOpen] = useState(null);

    const toggleMenu = (index) => {
        setMenuOpen((prevIndex) => (prevIndex === index ? null : index));
    };

    const applicant = [
      { date: '01/03/24', recruiter: 'Aliana', name: 'Gabbie Shelber', phone: '(876) 823-2198', email: 'gabbieshelber@gmail.com', eligibility: 'Engaged', status:'Pending' },
      { date: '01/03/24', recruiter: 'Macky', name: 'Maggie Bencher', phone: '(876) 823-3209', email: 'maggiebencher@gmail.com', eligibility: 'Engaged', status:'Rejected' }
    ]

    return (
        <div className="m-2">
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-2xl font-medium'>Recruitment</h1>
            </div>

            <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {applicant.map((applicant, index) => (
                  <div className='flex flex-col gap-2 p-6 bg-white shadow-sm border max-w-md'>
                    <div className='flex justify-between items-center'>
                      
                        <button onClick={() => toggleMenu(index)} className='text-gray-400 rounded-full hover:bg-gray-200 px-2 py-2 transition-all duration-300 relative'>
                            <BsThreeDots />
                            {menuOpen === index && (
                                <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <ul className="py-1 " role="none">
                                        <li
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                        >
                                            <FaPencilAlt />
                                            Eligibility Status
                                        </li>
                                        <li
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                                            role="menuitem"
                                        >
                                            <FaPencilAlt />
                                            Application Status
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
                              <h2 className='font-bold text-xl'>{applicant.name}</h2>
                          </div>
                      </div>
                      <div className='mt-3 p-2 bg-gray-100 text-xs text-gray-900'>
                          {applicant.email}
                          <div className='flex justify-between text-gray-500'>
                            {applicant.phone}
                          </div>
                      </div>
                      <div className='flex justify-between mt-4'>
                          <Badge children={applicant.eligibility} status={applicant.eligibility}></Badge>
                          <Badge children={applicant.status} status={applicant.status}></Badge>
                      </div>
                    </div>
                    ))}
                  </div>
                  
              </div>
            
    )
}

export default Recruitment