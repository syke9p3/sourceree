import { useState, useEffect } from "react"
import axios from 'axios';
import UpdateApplicant from "../components/UpdateApplicant.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useTitle } from "../hooks/useTitle";
import Badge from './../components/Badge';
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

    const { signedUser: user } = useSelector(state => state.auth)

    useEffect(() => {
        fetchApplicants(user.data.userId);
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
        setSelectedApplicant(prevApplicant => {
            console.log(`Handle edit selected applicant ${prevApplicant}`);
            return applicant;
        });
    };

    const handleUpdateApplicant = () => {
        setSelectedApplicant(null);
        fetchApplicants(user.data.userId);
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

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.map((applicant) => (
              <li key={applicant.id} className="relative bg-white shadow-sm border-solid border p-6 flex flex-col justify-between items-center">
                <div className="absolute top-0 left-0 mt-2 ml-2">
                  <Badge children="Pending" status="Pending"/>
                </div>

                <div className="flex flex-col items-center mt-9">
                  <h3 className="font-bold text-lg">{applicant.firstName} {applicant.middleName} {applicant.lastName}</h3>
                  <span className="text-sm text-gray-500">{applicant.email}</span>
                </div>

                {user && (
                  <div className="flex gap-4 mt-4">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 font-semibold text-sm rounded-full transition-colors duration-300"
                      onClick={() => handleEdit(applicant)}>
                      <span className="flex items-center">
                        <FaPencilAlt size={16} className="mr-2" />
                        Edit
                      </span>
                    </button>

                    <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 font-semibold text-sm rounded-full transition-colors duration-300"
                      onClick={() => deleteApplicant(applicant.id)}>
                      <span className="flex items-center">
                        <FaTrash size={16} className="mr-2" />
                        Delete
                      </span>
                    </button>
                  </div>
                )}

                {selectedApplicant && selectedApplicant.id === applicant.id && (
                  <UpdateApplicant
                    key={selectedApplicant.id}
                    applicant={selectedApplicant}
                    onUpdateApplicant={handleUpdateApplicant}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
    )
}

export default Applicants