import { useEffect, useState } from 'react'
import Navigation from '../Navigation';
import { checkToken, fetchToken } from '../../auth/auth-utils';
import * as backendConfig from '../../auth/backend-conf';
import { Redirect } from 'react-router-dom';

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
        // console.log(loggedIn);
        if(checkToken()){
            setLoggedIn(true);
            setLoading(false);
            const token = fetchToken();
            fetch(backendConfig.backendURL + backendConfig.routes.fetchUser, {
                method: "GET",
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            })
            .then(res => res.json())
            .then(res => {
                setUserData(res.user);
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
 
                    <div>
                        <Navigation />
                        <div className="container flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">  {/* container my-6 */}
                            {children}
                        </div>
                    </div>
                    
                </>) }
    
            </>
            )}
        </>
    )
}
