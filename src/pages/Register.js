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

import './LoginRegister.css'

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
        if(loggedIn) {
            setLoading(false);
            history.push('/profile');
        } else {
            setLoading(false);
        }
    }, [loggedIn, history, password, password2])

    const handleChange = (e) => {
        e.target.name === 'email' && setEmail(e.target.value);
        e.target.name === 'password' && setPassword(e.target.value);
        e.target.name === 'password2' && setPassword2(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        register({email, password, password2}).then(res => {
            if(res.success){       
                setLoggedIn(true);
                setUser(res.data.user);
                history.push('/editor');
            }
        }).catch(err => {
                setSubmitting(false);
            console.log('Register errerror  : ', err);  
        })
    };

    return (
        <>
        {loading ? <Loading /> : ( <>
            <Layout title="Register">
                <div className="register-wrapper">

                    <img className="logo" src={logo} alt="Logo" />
                    <h2 className="title">
                        Register a new account
                    </h2>
                        
                    <form onSubmit={handleSubmit} className="vertical-form">
                            <input aria-label="Email" name="email" type="email" required className="input" placeholder="email" onChange={handleChange} value={email}/>
                            <input aria-label="Password" name="password" type="password" required className="input" placeholder="password" onChange={handleChange} value={password}/>
                            <input aria-label="Password" name="password2" type="password" required className="input" placeholder="retype password" onChange={handleChange} value={password2}/>

                            <button type="submit" className="btn" disabled={submitDisabled}>
                            
                            {/* {isSubmitting ? "Registering..." : "Register"} */}
                            register
                            </button>
                    </form>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or <Link to="/login" className="link ">login here.
                        </Link>
                    </p>
                </div>
            </Layout>
        </>)}
        </>
    )
}
