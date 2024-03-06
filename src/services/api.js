import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

//token
function signIn(body) {
    const promise = axios.post(`${URL}/token`, body);
    return promise;
}
function refreshToken(body) {
    const promise = axios.post(`${URL}/token/refresh`, body);
    return promise;
}
function verifyToken(body) {
    const promise = axios.post(`${URL}/token/verify`, body);
    return promise;
}

//directories
function getDirectories(token) {
    const config = createConfig(token);
    const promise = axios.get(`${URL}/directories`, config);
    return promise;
}
function postDirectories(body, token) {
    const config = createConfig(token);
    const promise = axios.post(`${URL}/directories`, body, config);
    return promise;
}
//directory
function getDirectoryById(id, token) {
    const config = createConfig(token);
    const promise = axios.get(`${URL}/directory/${id}`, config);
    return promise;
}
function putDirectory(body, id, token){
    const config = createConfig(token);
    const promise = axios.put(`${URL}/directory/${id}`, body, config);
    return promise;
}
function patchDirectory(body, id, token){
    const config = createConfig(token);
    const promise = axios.patch(`${URL}/directory/${id}`, body, config);
    return promise;
}
function deleteDirectory(id, token){
    const config = createConfig(token);
    const promise = axios.delete(`${URL}/directory/${id}`, config);
    return promise;
}

const api = {
    signIn, refreshToken, verifyToken,
    getDirectories, postDirectories,
    getDirectoryById, putDirectory, patchDirectory, deleteDirectory
};

export default api;