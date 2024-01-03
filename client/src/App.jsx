import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home";
import CreateApplicant from './pages/CreateApplicant.jsx';
import Applicant from './components/Applicant';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useContext, useState } from 'react';
import { ThemeContext } from './main.jsx'
import { useSelector } from 'react-redux';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './pages/PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Applicants from './pages/Applicants.jsx';
import Validation from './pages/Validation.jsx';

const App = () => {

    const [open, setOpen] = useState(true)

    const toggleOpen = () => {
        setOpen(!open)
    }

    const theme = useContext(ThemeContext)
    const { signedUser: User } = useSelector(state => state.auth)

    return (
        <Router>
            <div className='flex'>
                {/* {User && <Sidebar />} */}
                <Sidebar open={open} toggleOpen={toggleOpen} />
                <div className={`flex-1 ${open ? 'ml-[18rem]' : 'ml-[5rem]'} transition-padding duration-300 ease`}>
                    <Navbar />
                    <div className='mx-10 my-10'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/applicants' element={<Applicants />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Registration />} />
                            <Route path='/create/applicant' element={<CreateApplicant />} />
                            <Route element={<PrivateRoute />}>
                                <Route path='/profile' element={<Profile />} />
                            </Route>
                            <Route path='/applicant/:id' element={<Applicant />} />
                            <Route path='/validation' element={<Validation />}></Route>
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>
            </div >
        </Router >
    )
}

export default App
