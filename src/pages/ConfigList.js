import { useState } from 'react'
import Layout from '../components/layout/index';

// State Imports
import { useRecoilValue } from 'recoil';
import { userState } from '../auth/user-atoms';

import './ConfigList.css'

export default function ConfigList() {
    const user = useRecoilValue(userState);
    console.log("user config states ====================>>> : ", user);
    return (
        <Layout title="Profile" auth={true}>
            <div className="list-wrapper">
                <ol className="config-list">
                {user.map(item => {
                    return <li>{item.config_name} v: {item.config_version}</li>
                })}
                </ol>
            </div>
        </Layout>
    )
}
