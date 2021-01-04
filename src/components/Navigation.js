import { Link, useHistory } from 'react-router-dom';

// State Imports
import { useRecoilValue } from 'recoil';
import { userState, isLoggedIn } from '../auth/user-atoms';

import './Navigation.css';

export default function Navigation() {
    const loggedIn = useRecoilValue(isLoggedIn);
    const user = useRecoilValue(userState);
    const history = useHistory();

    console.log("this is history =================>> : ", history.location.pathname);

    const links = [
        // {
        //     name: 'Login',
        //     route: '/Login'
        // },
        // {
        //     name: 'Register',
        //     route: '/register'
        // },
        {
            name: 'Config List',
            route: '/config-list',
            protected: true,
        },
        {
            name: 'Config Editor',
            route: '/editor',
            protected: true,
        },
    ];

    return (
        <nav className="navigation">
            <div>
                {links.map(link => {
                    if(!loggedIn && link.protected){
                        return null;
                    } else {
                        return (
                            <Link to={link.route} key={link.name} className={`nav-link${history.location.pathname === link.route ? '-selected' : ''}`}>
                                {link.name}
                            </Link>
                            
                        )
                    }
                })}
            </div>
        {loggedIn ? (<>
            <Link to="/logout">
                <button className="btn">
                    Logout
                </button>
            </Link>
            </>) : (<></>)}
        </nav>   
    )
}
