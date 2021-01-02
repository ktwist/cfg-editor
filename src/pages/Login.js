import { useState, useEffect } from 'react';
import Layout from '../components/layout/index';
import { login } from "../auth/auth-utils";
import { Link, useHistory } from 'react-router-dom';

// State imports
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, isLoggedIn } from '../auth/user-atoms';

import logo from '../assets/logo.png';

// Loading
import Loading from '../components/layout/Loading';

import './LoginRegister.css'

export default function Login() {
    const setUser = useSetRecoilState(userState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    let history = useHistory();
    
    useEffect(() => {
        if(loggedIn) {
            setLoading(false);
            history.push('/config-list');
        } else {
            setLoading(false);
        }
    }, [loggedIn, history])

    const handleSubmit = (event) => {
        console.log('Login Values =========================>>> : ', event);
        event.preventDefault();
        login({email, password}).then(res => {
            if(res.success){
                setLoggedIn(true);
                setUser(res.data.user);
                setSubmitting(false);
                console.log('Login Values =========================>>> : ', res);
                history.push('/editor');
            }
        }).catch(err => {
                setSubmitting(false);
        })
    };

    const handleChange = (e) => {
        console.log('Handle input change ==================>> : ', e.target.value);
        e.target.name === 'email' && setEmail(e.target.value);
        e.target.name === 'password' && setPassword(e.target.value);
    };
    return (
        <>
        {loading ? <Loading /> : ( <>
            <Layout title="Login">
                <div className="login-wrapper">
                    <img className="logo" src={logo} alt="Logo" />
                    <h2 className="title">
                        Sign in
                    </h2>

                    <form onSubmit={handleSubmit} className="vertical-form">
                        <input aria-label="Email" name="email" type="email" required className="input" placeholder="email" onChange={handleChange} value={email}/>
                        <input aria-label="Password" name="password" type="password" required className="input" placeholder="Password" onChange={handleChange} value={password}/>

                        <button type="submit" className="btn" >
                        {/* {isSubmitting ? "Signing in..." : "Sign in"} */}
                            Sign in
                        </button>
                        <p>
                            Or <Link to="/register" className="link">register here.</Link>
                        </p>
                    </form>
                </div>
            </Layout>
        </>)}
        </>
    )
}
