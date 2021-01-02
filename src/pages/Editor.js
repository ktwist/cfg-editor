import { useState } from 'react'
import { Link } from 'react-router-dom';
import { saveConfig } from "../auth/auth-utils";
import Layout from '../components/layout/index';
import { checkToken, fetchToken } from '../auth/auth-utils';

// State Imports
import { useRecoilValue } from 'recoil';
import { userState } from '../auth/user-atoms';

export default function Editor() {
    const user = useRecoilValue(userState);
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [data, setData] = useState('');

    // const saveConfig = () => {
    //     console.log(loggedIn);
    //     if(checkToken()){
    //         setLoggedIn(true);
    //         setLoading(false);
    //         const token = fetchToken();
    //         fetch(backendConfig.backendURL + backendConfig.routes.fetchUser, {
    //             method: "POST",
    //             // mode: 'no-cors',
    //             // cache: 'no-cache',
    //             // credentials: 'same-origin',
    //             body: "here is the body",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token.token}`
    //             },
    //             redirect: 'follow',
    //             referrerPolicy: 'no-referrer',
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             setUserData(res.user);
    //         });
    //     } else {
    //         setLoading(false);
    //     }
    // }

    const handleSubmit = (event) => {
        console.log('Login Values =========================>>> : ', event);
        event.preventDefault();
        saveConfig({name, version, data}).then(res => {
            if(res.success){
                // setLoggedIn(true);
                // setUser(res.data.user);
                // setSubmitting(false);
                console.log('Login Values =========================>>> : ', res);
                // history.push('/editor');
            }
        }).catch(err => {
                // setSubmitting(false);
                console.log('Login Values =========================>>> : ', err);
        })
    };

    const handleChange = (e) => {
        console.log('Handle input change ==================>> : ', e.target.value);
        e.target.name === 'name' && setName(e.target.value);
        e.target.name === 'data' && setData(e.target.value);
        e.target.name === 'version' && setVersion(e.target.value);
    };

    return (
        <Layout title="Profile" auth={true}>
            <div className="register-wrapper">

                <h3 className="title">
                    Editor
                </h3>
                
                <form onSubmit={handleSubmit} className="vertical-form">
                    <div>
                        <input aria-label="Name" name="name" type="text" required className="input" placeholder="config name" onChange={handleChange} value={name}/>
                        <input aria-label="Version" name="version" type="text" required className="input" placeholder="version" onChange={handleChange} value={version}/>
                    </div>
                        <textarea rows="20" cols="80" aria-label="data" name="data" type="text-area" required className="input" placeholder="Config data in JSON format" onChange={handleChange} value={data} />

                        <button type="submit" className="btn" >
                        
                        {/* {isSubmitting ? "Registering..." : "Register"} */}
                        save
                        </button>
                </form>
            </div>
        </Layout>
    )
}
