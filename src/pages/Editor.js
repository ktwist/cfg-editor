import { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { saveConfig } from "../auth/auth-utils";

// State Imports
import { useRecoilValue } from 'recoil';
import { userState, currentConfig } from '../auth/user-atoms';


import './Editor.css'

export default function Editor() {
    const [loading, setLoading] = useState(false);
    const [jsonContent, setJsonContent] = useState('');
    const user = useRecoilValue(userState);
    const selectedConfig = useRecoilValue(currentConfig);
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [data, setData] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const history = useHistory()

    useEffect(() => {
        if(selectedConfig) {
            setLoading(false);
            setName(selectedConfig.config_name);
            setVersion(selectedConfig.config_version);
            setData(selectedConfig.data);
            setJsonContent(JSON.stringify(data, null, 2))
            

            console.log('Login Values =========================>>> : ', selectedConfig.data);
        } else {
            setLoading(false);
        }
    }, [selectedConfig, data])

    const handleSubmit = (event) => {
        console.log('Login Event submit =========================>>> : ', event);
        event.preventDefault();
        saveConfig({name, version, data: JSON.parse(jsonContent)}).then(res => {
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

    const handleJsonEditChange = (e) => {
        const editorContent = e.target.value
        setJsonContent(editorContent);
        console.log("String json output", e.target.value);
        try {
            if(JSON.parse(editorContent) && !!editorContent)
            // setData(JSON.parse(editorContent));
            setSubmitDisabled(false);
        } catch (error) {
            setSubmitDisabled(true);
            console.log("Not valid Json". err)
        }
    };

    const PrettyPrintJson = (data) => (<div><pre>{ 
        JSON.stringify(data, null, 2) }</pre></div>);

    return (
            <div className="editor-wrapper">

                <h3 className="title">
                    Configuration Editor
                </h3>
                {!loading &&
                <form onSubmit={handleSubmit} className="vertical-form">
                    <div>
                        <input aria-label="Name" name="name" type="text" required className="input" placeholder="config name" onChange={handleChange} value={name}/>
                        <input aria-label="Version" name="version" type="text" required className="input" placeholder="version" onChange={handleChange} value={version}/>
                    </div>
                        <textarea rows="20" cols="60" aria-label="data" name="data" type="text-area" required className="input" placeholder="Config data in JSON format" onChange={handleJsonEditChange} value={jsonContent} />

                        <button type="submit" className="btn" disabled={submitDisabled} >
                        
                        {/* {isSubmitting ? "Registering..." : "Register"} */}
                        save
                        </button>
                </form>}
            </div>
    )
}
