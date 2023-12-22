import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import CreateEmployee from './pages/CreateEmployee';
import Employee from './components/Employee';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create_employee' element={<CreateEmployee />} />
                <Route path='/employee/:id' element={<Employee />} />
            </Routes>
        </Router>
    )
}

export default App
