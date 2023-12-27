import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

const Registration = () => {

    useTitle('Sign Up Page')

    const naviagateTo = useNavigate()

    const initialValues = {
        username: '',
        email: '',
        password: '',
    }

    const registrationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required('*Username is required'),
        email: Yup.string().email('*Invalid email').required('*Email is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            // .matches(
            //     // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,

            //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            // )
            .required('Password is required')
    });

    const onSubmit = (userData) => {
        axios.post('http://localhost:8080/api/auth/signup', userData)
            .then(response => {
                console.log(" Registration is successful ")
                naviagateTo('/login?signUpSuccess=true')
            })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registrationSchema}>
                <Form className='bg-white max-w-md border-2 border-solid flex flex-col gap-2 p-6 mx-auto'>
                    <h3 className="font-bold text-xl mb-4">SIGN UP</h3>
                    <div>
                        <label htmlFor="username" className=''>Username</label>
                        <ErrorMessage
                            name="username"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="username"
                            placeholder="Example John"
                            className="bg-gray-200 border border-solid w-full p-2 my-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className=''>Email</label>
                        <ErrorMessage
                            name="email"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="bg-gray-200 border border-solid w-full p-2 my-2" />
                    </div>
                    <div>
                        <label htmlFor="password" className=''>Password</label>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className='text-red-500 ml-2 text-xs' />
                        <Field
                            name="password"
                            type="password"
                            placeholder="Your password"
                            className="bg-gray-200 border border-solid w-full p-2 my-2" />
                    </div>
                    <div className="my-6 ">
                        <p className='text-xs text-gray-400'>By clicking Sign Up, you agree to our <span className='text-blue-500'><Link to='/privacy'>Privacy Policy</Link></span>.</p>
                        <button className="bg-green-500 hover:bg-green-600 font-bold text-white rounded p-2 my-2 w-full" type="submit">Sign Up</button>
                    </div>
                    <p className='text-sm'>Have an account? <Link to='/login'><span className='text-blue-500 font-medium'>Sign in</span></Link></p>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration