import React, {useState} from "react";
import './Home.css';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
    const { user, logout } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();

    async function handleLogout(){
        setError('');
        try{
            await logout();
            history.push('/auth')
        } catch (err){
            setError('Failed To Logout');
        }
    }

    return (
        <div>
            { user }
            <h1>Home</h1>
            <Button onclick={handleLogout} as={Link}>
                Logout
            </Button>
        </div>
    );
}
