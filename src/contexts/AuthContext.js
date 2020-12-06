import React, {useContext, useEffect, useState} from "react";
import axios from '../axios-kbu';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    async function login(username, password){
        try{
            const data = {
                username:username,
                password:password,
            }
            const res = await axios.post('/auth/login/',{...data});
            console.log(res);
            const { key } = res.data;
            localStorage.setItem('token',key);
            localStorage.setItem('user',username);
            setToken(key);
            setUser(username);
            setIsAuth(true);
        } catch (err) {
            return Promise.reject(err);
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
            const { key } = res.data;
            localStorage.setItem('token',key);
            localStorage.setItem('user',username);
            setUser(username);
            setToken(key);
            setIsAuth(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async function logout(authToken){
        try{
            const res = await axios.post('/auth/logout/',{}, {
                Authorization:authToken
            });
            console.log(res);
            setUser(null);
            setToken(null);
            setIsAuth(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        catch (err){
            return new Promise.reject('some err');
        }
    }

    useEffect(() => {
        function autoLogin(){
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            console.log('Inside useEffect hook for auto login');
            if (storedUser && storedToken) {
                setUser(storedUser);
                setToken(storedToken);
                setIsAuth(true);
            }
        }
        return autoLogin();
    }, []);

    const value = {
        token,
        user,
        isAuth,
        login,
        signUp,
        logout,
    }
    return(
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}