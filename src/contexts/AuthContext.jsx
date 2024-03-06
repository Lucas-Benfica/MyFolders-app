import { createContext, useState } from "react"; 

const AuthContext = createContext();

export function AuthProvider({children}){

    const persistedAccess = JSON.parse(localStorage.getItem("access"));
    const persistedRefresh = JSON.parse(localStorage.getItem("refresh"));

    const [access, setAccess] = useState(persistedAccess);
    const [refresh, setRefresh] = useState(persistedRefresh);

    function signUp({access, refresh}){
        setAccess(access);
        localStorage.setItem("access", JSON.stringify(access));
        setRefresh(refresh);
        localStorage.setItem("refresh", JSON.stringify(refresh));
    }
    function logout(){
        setAccess('');
        setRefresh('');
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
    

    return (
        <AuthContext.Provider value={{access, refresh, signUp, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;