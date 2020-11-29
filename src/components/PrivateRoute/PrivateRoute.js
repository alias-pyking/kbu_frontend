import React from "react";
import { Route, Redirect } from 'react-router-dom';
import  { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({component: Component, ...rest}){
    const { isAuth } = useAuth();
    console.log(isAuth);
    return (
        <Route
            {...rest}
            render= { props => {
                return isAuth ? <Component {...props}/> : <Redirect to='/auth/'/>
                }
            }
        >
        </Route>
    )
}