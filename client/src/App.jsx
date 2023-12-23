import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home";
import CreateEmployee from './pages/CreateEmployee';
import Employee from './components/Employee';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ReactSVG from './assets/react.svg';
import { useContext } from 'react';
import { ThemeContext } from './main.jsx'

const App = () => {

    const theme = useContext(ThemeContext)

    return (
        <div className=''>
            <Router>
                <nav className='bg-black p-6 mb-6 flex justify-between items-center'>
                    <Link to="/"><img src={ReactSVG} alt="" /></Link>

                    <ul className='text-white font-bold flex gap-4'>
                        <li className=''>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className=''>
                            <Link to='/registration'>Register</Link>
                        </li>
                        <li className=''>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </nav>
                <div className='mx-20'>
                {/* Theme: {theme} */}

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/create/employee' element={<CreateEmployee />} />
                        <Route path='/employee/:id' element={<Employee />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App
