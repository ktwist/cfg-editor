import * as backendConfig from './backend-conf';

async function makeRequest(url = '', data = {}, type = '', headers = { 'Content-Type': 'application/json'} ) {
    const response = await fetch(url, {
        method: type,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function makeAuthorisedRequest(
    url = '', 
    data = {}, 
    type = '', 
    headers = { 
        'Content-Type': 'application/json',
        Accept: "*/*",
        Authorization: fetchToken(),
    } ) {
    const response = await fetch(url, {
        method: type,
        // mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: headers,
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        body: type !== 'GET' ? JSON.stringify(data) : null
    });
    return response.json();
}

export const checkToken = () => {
    const token = localStorage.getItem("token");
    return !!token && String(token) !== "null" && String(token) !== "undefined" && token;
}

async function createLocalstorageItem(key, value) {
    localStorage.setItem(key, value);
    return true;
}

export function fetchToken() {
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("Token doesn't exist.")
    }
    return token;
}

export const login = async (credentials = {}) => {
    localStorage.removeItem("token");
    if (!credentials || !credentials.email || !credentials.password) {
        throw new Error("Some fields are missing.")
    }
    const data = await makeRequest(backendConfig.backendURL + backendConfig.routes.login, credentials, 'POST');

    if (data.error) {
        throw (new Error(data.error));
    } else {
        console.log("Token login request ===============>>> : ", data);
        createLocalstorageItem("token", data.token);
        return {
            success: true,
            data: { ...data,
                email: credentials.email,
                password: credentials.password
            }
        };
    }
}

export const register = async (details = {}) => {
    console.table('DETAILS submit ===============>>> : ', details);
    localStorage.removeItem("token");
    if (!details || !details.email || !details.password || !details.password2) {
        throw new Error("Some fields are missing.")
    }
    const data = await makeRequest(backendConfig.backendURL + backendConfig.routes.register, details, 'POST');

    if (data.error) {
        throw (new Error(data.error));
    } else {
        createLocalstorageItem("token", JSON.stringify({token: data.token, expiry: new Date().getTime() + 60 * 60 * 1000}));
        return {
            success: true,
            data: data
        };
    }
}

export const logout = async () => {
    localStorage.removeItem("token");
    return true;
}

export const saveConfig = async (details = {}) => {
    console.table('DETAILS saveConfig ===============>>> : ', details);
    if (!details || !details.name || !details.version || !details.data) {
        throw new Error("Some fields are missing.")
    }
    const data = await makeAuthorisedRequest(backendConfig.backendURL + backendConfig.routes.config, details, 'POST');

    if (data.error) {
        throw (new Error(data.error));
    } else {
        console.table('Config save sucess  ===============>>> : ', data);
        return {
            success: true,
            data: data
        };
    }
}

export const loadConfig = async (details = {}) => {
    console.table('DETAILS saveConfig ===============>>> : ', details);
    if (!details || !details.name || !details.version) {
        throw new Error("Some fields are missing.")
    }
    const data = await makeAuthorisedRequest(backendConfig.backendURL + backendConfig.routes.config + `/${details.name}?version=${details.version}`, {}, 'GET');

    if (data.error) {
        throw (new Error(data.error));
    } else {
        console.table('Config load sucess  ===============>>> : ', data);
        return {
            success: true,
            data: data
        };
    }
}