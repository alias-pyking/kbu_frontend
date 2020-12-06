import React, {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {Button, Card, Form, Grid, Header} from "semantic-ui-react";
import Error from '../../components/Error/Error';

function Logout(props) {
    const {isAuth, logout, token} = useAuth();
    const [error, setError] = useState('');

    async function onLogoutClick() {
        if (!isAuth) {
            setError('You are not authenticated');
            return;
        }
        try {
            await logout(token);
        } catch (err) {
            setError('Something went wrong unable to logout, try again.');
        }
    }

    return (
        <div className='ui huge form'>
            <Grid textAlign='center' verticalAlign={"middle"}>
                <Grid.Column >
                    <Form size={'large'}>
                        {error ? <Error error={error}/> : ''}
                            Are you sure you want to logout ?
                        <Button color='red' onClick={onLogoutClick}>Logout</Button>

                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Logout;