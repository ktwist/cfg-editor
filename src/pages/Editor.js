import Layout from '../components/layout/index';

// State Imports
import { useRecoilValue } from 'recoil';
import { userState } from '../auth/user-atoms';

export default function Editor() {
    const user = useRecoilValue(userState);
    return (
        <Layout title="Profile" auth={true}>
            <div className="bg-white">
                <h3 className="text-lg">
                    Profile
                </h3>

                <button className="btn">
                    Save Config
                </button>
            </div>
        </Layout>
    )
}
