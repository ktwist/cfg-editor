import { Link } from 'react-router-dom';

// State Imports
import { useRecoilValue } from 'recoil';
import { userState, isLoggedIn } from '../auth/user-atoms';

import './Navigation.css';

export default function Navigation() {
    const loggedIn = useRecoilValue(isLoggedIn);
    const user = useRecoilValue(userState);

    const links = [
        {
            name: 'Login',
            route: '/Login'
        },
        {
            name: 'Register',
            route: '/register'
        },
        {
            name: 'Config Editor',
            route: '/editor',
            protected: true,
        }
    ];

    return (
        <nav className="navigation">
        {links.map(link => {
            if(!loggedIn && link.protected){
                return null;
            } else {
                return (
                    <Link to={link.route} key={link.name} className="nav-link">
                        {link.name}
                    </Link>
                    
                )
            }
        })}
        </nav>   
    )
}
