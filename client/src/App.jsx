import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home";
import CreateEmployee from './pages/CreateEmployee';
import Employee from './components/Employee';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useContext } from 'react';
import { ThemeContext } from './main.jsx'
import { useSelector } from 'react-redux';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './pages/PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar.jsx';

const App = () => {

    const theme = useContext(ThemeContext)
    const {signedUser : User } = useSelector(state => state.auth)

    return (
        <Router>
            <div className='flex'>
                {/* {User && <Sidebar />} */}
                <Sidebar />
                <div className='flex-1 h-screen'>
                    <Navbar />
                    <div className='mx-10 my-10'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Registration />} />
                            <Route path='/create/employee' element={<CreateEmployee />} />
                            <Route element={<PrivateRoute />}>
                                <Route path='/profile' element={<Profile />} />
                            </Route>
                            <Route path='/employee/:id' element={<Employee />} />
                        </Routes>
                    </div>
                </div>
            </div >
        </Router >
    )
}

export default App
