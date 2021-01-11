import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';
import { loadConfig } from "../auth/auth-utils";
import Layout from '../components/layout/index';
import Editor from './Editor';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';

// State Imports
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, currentConfig } from '../auth/user-atoms';

import './ConfigList.css'

export default function ConfigList() {

    const setSelectedConfig = useSetRecoilState(currentConfig);

    const user = useRecoilValue(userState);

    const loadConfiguration = (name, version) => {
        loadConfig({name, version}).then(res => {
            if(res.success){
                setSelectedConfig(res.data);
            }
        }).catch(err => {
                console.log(err)
        })
    }

    let { path } = useRouteMatch();
    return (
        <Layout title="Profile" auth={true}>
                
            <div className="list-wrapper">
            <h3 className="list-title">Configuration List</h3>
                <PerfectScrollbar>
                    <ol className="config-list">
                    {user && user.map(item => {
                        return <li key={item.config_name + item.config_version}>
                                <Link  onClick={() => loadConfiguration(item.config_name, item.config_version)} to={`${path}/${item.config_name}`} className="list-item-link">
                                    {item.config_name} v: {item.config_version}
                                </Link>
                            </li>
                    })}
                    </ol>
                </PerfectScrollbar>
                <Switch>
                    <Route path={`${path}/:configId`}>
                        <Editor />
                    </Route>
                </Switch>
            </div>
        </Layout>
    )
}
