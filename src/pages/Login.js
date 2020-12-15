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

export default function Login() {
    const setUser = useSetRecoilState(userState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    let history = useHistory();
    
    useEffect(() => {
        if(loggedIn) {
            setLoading(false);
            history.push('/editor');
        } else {
            setLoading(false);
        }
    }, [loggedIn, history])

    const handleSubmit = (event) => {
        event.preventDefault();
        // login(values).then(res => {
        //     if(res.success){
        //         setLoggedIn(true);
        //         setUser(res.data.user);
        //         setSubmitting(false);
        //         history.push('/editor');
        //     }
            console.log('Login Values =========================>>> : ', event);
        // ).catch(err => {
        //         setSubmitting(false);
        // })
    };

    const handleChange = (e) => {
        console.log('Handle input change ==================>> : ', e.target.value);
    };
    return (
        <>
        {loading ? <Loading /> : ( <>
            <Layout title="Login">
            <div className="login-wrapper">
                <div className="max-w-md w-full">
                    <div>
                    <img className="logo" src={logo} alt="Logo" />
                    <h2 className="header">
                        Sign in
                    </h2>
                    <p className="register-wrap">
                        Or <Link to="/register" className="link">
                        register here.
                        </Link>
                    </p>
                    </div>
    
                    <form onSubmit={handleSubmit} className="login-form">
                    <input type="hidden" name="remember" value="true" />
                        <div className="login-form-inputs">
                            <div>
                            <input aria-label="Username" name="email" type="email" required className="input-username" placeholder="username" onChange={handleChange} value={username}/>
                            </div>
                            <div className="-mt-px">
                            <input aria-label="Password" name="password" type="password" required className="input-password" placeholder="Password" onChange={handleChange} value={password}/>
                            </div>
                        </div>

                        <div className="submit-wrapp">
                            <button type="submit" className="group" >
                            {/* {isSubmitting ? "Signing in..." : "Sign in"} */}
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </Layout>
        </>)}
        </>
    )
}
