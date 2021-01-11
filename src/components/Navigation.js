import { Link, useHistory, useRouteMatch } from 'react-router-dom';

// State Imports
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedIn, currentConfig } from '../auth/user-atoms';

import './Navigation.css';

export default function Navigation() {
    const loggedIn = useRecoilValue(isLoggedIn);
    const setCurrentConfig = useSetRecoilState(currentConfig);
    const history = useHistory();
    let { path } = useRouteMatch();

    const links = [
        {
            name: 'Config List',
            route: '/config-list',
            protected: true,
        }
    ];

    return (
        <nav className="navigation">
            <div>
                {links.map(link => {
                    if(!loggedIn && link.protected){
                        return null;
                    } else {
                        return (
                        <>
                            <Link to={link.route} key={link.name} className={`nav-link${history.location.pathname === link.route ? '-selected' : ''}`}>
                                {link.name}
                            </Link>
                            <Link to={`${path}/new-config`}  className={`nav-link`} onClick={() => setCurrentConfig({config_name: '', config_version:'1', data:{} })}>
                                + new config
                            </Link>
                        </>
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
