import React, {useContext, useState} from "react";
import axios from '../axios-kbu';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const { currentToken, setCurrentToken} = useState();

    async function login(username, password){
        try{
            const data = {
                username:username,
                password:password,
            }
            const res = await axios.post('/auth/login/',{...data});
            console.log(res);
            const { key } = res;
            setCurrentToken(key);
        } catch (err) {
            console.log(err);
        }
    }

    async function signUp(username, email, password1, password2){
        try{
            const data = {
                username: username,
                email: email,
                password1:password1,
                password2
            }
            const res = await axios.post('auth/registration/',{...data});
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const value = {
        currentToken,
        login,
        signUp,
    }
    return(
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}