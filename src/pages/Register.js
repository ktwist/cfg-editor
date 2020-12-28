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
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    let history = useHistory();
    
    useEffect(() => {
        if(loggedIn) {
            setLoading(false);
            history.push('/profile');
        } else {
            setLoading(false);
        }
    }, [loggedIn, history])

    const handleChange = (e) => {
        console.log('Handle input change ==================>> : ', e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        register({username, email, password}).then(res => {
            if(res.success){
                // toast.dark(`🐴 Registered successfully...`, {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });          
                console.log('Register response ================== >>> : ', res);      
                setLoggedIn(true);
                setUser(res.data.user);
                // setSubmitting(false);
                history.push('/editor');
            }
        }).catch(err => {
            // toast.dark(`❌ ${err}`, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     });
                // setSubmitting(false);
            console.log('Register response ================== >>> : ', err);  
        })
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // login(values).then(res => {
    //     //     if(res.success){
    //     //         setLoggedIn(true);
    //     //         setUser(res.data.user);
    //     //         setSubmitting(false);
    //     //         history.push('/editor');
    //     //     }
    //         console.log('Login Values =========================>>> : ', event);
    //     // ).catch(err => {
    //     //         setSubmitting(false);
    //     // })
    // };
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
                    {/* <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                        >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => ( */}
    
                       <form onSubmit={handleSubmit} className="mt-8">
                        <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">

                                <input aria-label="Name" name="name" type="text" required className="appearance-none" placeholder="Name" onChange={handleChange} value={username}/>
                     
                                <input aria-label="Email" name="email" type="text" required className="appearance-none" placeholder="Name" onChange={handleChange} value={email}/>

                                <div className="-mt-px">
                                <input aria-label="Password" name="password" type="password" required className="appearance-none" placeholder="Password" onChange={handleChange} value={password}/>
                                
                                </div>
                            </div>
            
                            <div className="mt-6">
                                <button type="submit" className="group" >
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
