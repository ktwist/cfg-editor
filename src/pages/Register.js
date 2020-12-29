import { useState, useEffect } from 'react'
import Layout from '../components/layout/index';
import { register } from "../auth/auth-utils";
import { Link, useHistory } from 'react-router-dom';

// State imports
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, isLoggedIn } from '../auth/user-atoms';

import logo from '../assets/logo.png';

// Loading
import Loading from '../components/layout/Loading';

export default function Register() {
    const setUser = useSetRecoilState(userState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [error, setError] = useState();
    let history = useHistory();
    
    useEffect(() => {
        password === password2 ? setSubmitDisabled(false) : setSubmitDisabled(true);
        console.log('pass01 and pass02 ==================>> : ', password, password2);
        if(loggedIn) {
            setLoading(false);
            history.push('/profile');
        } else {
            setLoading(false);
        }
    }, [loggedIn, history, password, password2])

    const handleChange = (e) => {
        console.log('Handle input change ==================>> : ', e.target.name);
        e.target.name === 'email' && setEmail(e.target.value);
        e.target.name === 'password' && setPassword(e.target.value);
        e.target.name === 'password2' && setPassword2(e.target.value);
    };

    const handleSubmit = (event) => {
        console.log('SUBMITTING ==================>> : ', email, password, password2);
        event.preventDefault();
        register({email, password, password2}).then(res => {
            if(res.success){       
                console.log('Register response ================== >>> : ', res);      
                setLoggedIn(true);
                setUser(res.data.user);
                history.push('/editor');
            }
        }).catch(err => {
                setSubmitting(false);
            console.log('Register response ================== >>> : ', err);  
        })
    };

    return (
        <>
        {loading ? <Loading /> : ( <>
            <Layout title="Register">
            <div className="py-4 ">
                <div className="max-w">
                    <div>
                    <img className="mx-auto" src={logo} alt="Logo" />
                    <h2 className="mt-6">
                        Register a new account
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or <Link to="/login" className="font-medium ">
                        login here.
                        </Link>
                    </p>
                    </div>
    
                       <form onSubmit={handleSubmit} className="mt-8">
                            <div className="rounded-md shadow-sm">

                                <input aria-label="Email" name="email" type="email" required className="appearance-none" placeholder="email" onChange={handleChange} value={email}/>

                                <div className="-mt-px">
                                <input aria-label="Password" name="password" type="password" required className="appearance-none" placeholder="password" onChange={handleChange} value={password}/>
                                <div className="-mt-px"></div>
                                <input aria-label="Password" name="password2" type="password" required className="appearance-none" placeholder="retype password" onChange={handleChange} value={password2}/>
                                
                                </div>
                            </div>
            
                            <div className="mt-6">
                                <button type="submit" className="group" disabled={submitDisabled}>
                                <span className="absolute ">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                {/* {isSubmitting ? "Registering..." : "Register"} */}
                                register
                                </button>
                            </div>
                        </form>
                    {/* )}
                     </Formik> */}
                    
                </div>
            </div>
            </Layout>
        </>)}
        </>
    )
}
