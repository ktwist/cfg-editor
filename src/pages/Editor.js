import { useState, useEffect } from 'react'
import { saveConfig } from "../auth/auth-utils";

// State Imports
import { useRecoilValue } from 'recoil';
import { currentConfig } from '../auth/user-atoms';


import './Editor.css'

export default function Editor() {
    const [loading, setLoading] = useState(false);
    const [jsonContent, setJsonContent] = useState('');
    const selectedConfig = useRecoilValue(currentConfig);
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [data, setData] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if(selectedConfig) {
            setLoading(false);
            setName(selectedConfig.config_name);
            setVersion(selectedConfig.config_version);
            setData(selectedConfig.data);
            setJsonContent(JSON.stringify(data, null, 2))
        } else {
            setLoading(false);
        }
    }, [selectedConfig, data])

    const handleSubmit = (event) => {
        event.preventDefault();
        saveConfig({name, version, data: JSON.parse(jsonContent)}).then(res => {
            if(res.success){

                console.log('Save success : ', res);
            }
        }).catch(err => {
                // setSubmitting(false);
                console.log('Saving error : ', err);
        })
    };

    const handleChange = (e) => {
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
            setSubmitDisabled(false);
        } catch (err) {
            setSubmitDisabled(true);
            console.log("Not valid Json", err)
        }
    };

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
