import { useEffect } from 'react'
import { Redirect } from 'react-router-dom';

import { logout } from '../auth/auth-utils';

// State imports
import { useSetRecoilState } from 'recoil';
import { isLoggedIn, userState } from '../auth/user-atoms'

export default function Logout() {
    const setLoggedIn = useSetRecoilState(isLoggedIn);
    const setUserState = useSetRecoilState(userState);

    useEffect(() => {
        logout();
        setLoggedIn(false);
        setUserState([]);        
    }, [setLoggedIn, setUserState])
    return (
        <Redirect to="/login" />
    )
}
