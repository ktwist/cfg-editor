import { useEffect, useState } from 'react'
import Navigation from '../Navigation';
import Footer from '../Footer';
import { checkToken, fetchToken } from '../../auth/auth-utils';
import * as backendConfig from '../../auth/backend-conf';
import { Redirect } from 'react-router-dom';

import './Layout.css'
// Loading Screen
import Loading from './Loading';

// State imports
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, isLoggedIn } from '../../auth/user-atoms';

export default function Layout({title, auth=false, authFallback="/login", children}) {
    const setUserData = useSetRecoilState(userState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [loading, setLoading] = useState(auth);

    useEffect(() => {
        console.log(loggedIn);
        if(checkToken()){
            setLoggedIn(true);
            setLoading(false);
            const token = fetchToken();
            fetch(backendConfig.backendURL + backendConfig.routes.config, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then(res => res.json())
            .then(res => {
                //Show only my configs
                //const myConfigs = res.filter((el) => el.config_name.split('_')[el.config_name.split('_').length-1] === "erm")
                setUserData(res);
            });
        } else {
            setLoading(false);
        }
       
    }, [auth, authFallback, loggedIn, setLoggedIn, setUserData])
    return (
        <>
            {loading ? <Loading /> : (
                <>
                {/* Fallback Redirect */}
                {auth && !loggedIn ? <Redirect to={authFallback} /> : (<>
                    <Navigation />
                    <div className="container"> 
                        {children}
                    <Footer />
                    </div>
                </>) }
    
            </>
            )}
        </>
    )
}
