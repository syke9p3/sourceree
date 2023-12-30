import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateApplicant from "../components/UpdateApplicant.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import ApplicantSkeleton from "../components/skeletons/ApplicantSkeleton";

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
        <div className="m-2">
            <div className="flex justify-between items-center mb-10">
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                {User && (
                    <Link to='/create/applicant'>
                        <button className="bg-green-600 font-bold text-white px-3 py-2 my-2 text-sm shadow-md hover:bg-green-700" type="submit">
                            + Add Applicant
                        </button>
                    </Link>
                )
                }
            </div>


            {/* <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton />
            <ApplicantSkeleton /> */}


        </div>
    )
}

export default Home
