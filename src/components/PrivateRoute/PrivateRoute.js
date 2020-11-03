import React from "react";
import { Route, Redirect } from 'react-router-dom';
import  { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({component: Component, ...rest}){
    const { token } = useAuth();
    console.log(token);
    return (
        <Route
            {...rest}
            render= { props => {
                return token ? <Component {...props}/> : <Redirect to='/auth/'/>
                }
            }
        >
        </Route>
    )
}