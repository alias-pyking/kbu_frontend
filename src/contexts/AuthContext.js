import React, {useContext, useEffect, useState} from "react";
import axios from '../axios-kbu';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [tokenExpiration, setTokenExpiration] = useState(null);
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
            const tokenExpirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
            localStorage.setItem('token',key);
            localStorage.setItem('user',username);
            localStorage.setItem('tokenExpiration', tokenExpirationTime.toISOString());
            setToken(key);
            setUser(username);
            setTokenExpiration(tokenExpirationTime);
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
            const tokenExpirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
            localStorage.setItem('token',key);
            localStorage.setItem('user',username);
            localStorage.setItem('tokenExpiration', tokenExpirationTime.toISOString());
            setUser(username);
            setToken(key);
            setTokenExpiration(tokenExpirationTime);
            setIsAuth(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async function logout(){
        try{
            setUser(null);
            setToken(null);
            setTokenExpiration(null);
            setIsAuth(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
        }
        catch (err){
            return new Promise.reject('some err');
        }
    }

    useEffect(() => {
        function autoLogin(){
            const storedExpirationTime = localStorage.getItem('tokenExpiration');
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            console.log('Inside useEffect hook for auto login');
            if (storedExpirationTime && storedUser && storedToken && new Date(storedExpirationTime) > new Date()) {
                setUser(storedUser);
                setToken(storedToken);
                setIsAuth(true);
                setTokenExpiration(storedExpirationTime);
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