import React, {Component, useState} from "react";
import {Button, Form, Grid, Header, Label, Message, Segment} from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { useAuth } from '../../contexts/AuthContext';
import { Error } from "../../components/Error/Error";


function Auth(){
    const [username, setUserName] = useState('');
    const [usernameError, setUserNameError] = useState(null);
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [flag, setFlag] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function onEmailChange(event){
        setEmail(event.target.value);
    }

    function onUserNameChange(event){
        setUserName(event.target.value);
    }
    function onPasswordChange1(event){
        setPassword1(event.target.value);
    }

    function onPasswordChange2(event){
        setPassword2(event.target.value);
    }

    function onFlagChange(){
        setFlag(!flag)
    }

    const { login, signUp } = useAuth();

    async function onSubmitRegister(ev){
        ev.preventDefault();
        if(password1 !== password2){
            return setError('Passwords do not match');
        }
        setError('');
        try{
            setLoading(true);
            await signUp(username, email, password1, password2);
        } catch (err){
            console.log(err);
            setError('user with username or email already exists');
        }
        setLoading(false);
    }

   async function onSubmitSignIn(ev){
        ev.preventDefault();
        console.log('logging in');
        try{
            setLoading(true);
            setError('');
            await login(username, password1);
        } catch (err) {
            console.log(err);
            setError('Either username does not exists or username/password is incorrect');
        }
        setLoading(false);
    }

    if (flag) {
        return (
            <div className="ui huge form">
                <Grid textAlign='center' style={{height: '70vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        {error ? <Error error={error}/>:''}
                        <Header as='h2' color='teal' textAlign='center'>
                            <img src={logo} alt='something'/> Register!
                        </Header>

                        <Form size='large'  onSubmit={onSubmitRegister}>
                            <Segment raised>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    required={true}
                                    placeholder='username'
                                    size='huge' id="username"
                                    onChange={onUserNameChange}/>
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    required={true}
                                    type='email'
                                    placeholder='E-mail address'
                                    size='huge' id="email-address"
                                    onChange={onEmailChange}/>
                                <Form.Input
                                    fluid
                                    required={true}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    size='huge'
                                    id="password1"
                                    onChange={onPasswordChange1}
                                />
                                <Form.Input
                                    fluid
                                    required
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    size='huge'
                                    id="password2"
                                    onChange={onPasswordChange2}
                                />
                                <Button color='teal' fluid size='huge' type={'submit'}>
                                    Register
                                </Button>
                            </Segment>
                        </Form>

                        <Message>
                            Already having an account <Button disabled={loading} onClick={onFlagChange}>Sign In</Button>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    return (
        <div className="ui huge form">
            <Grid textAlign='center' style={{height: '70vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    {error ? <Error error={error}/>:''}
                    <Header as='h2' color='teal' textAlign='center'>
                        <img src={ logo } alt='kbu-logo'/> Log-in to your account
                    </Header>

                    <Form size='large' onSubmit={onSubmitSignIn}>
                        <Segment raised>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='username'
                                required={true}
                                size='huge' id="username"
                                onChange={onUserNameChange}/>
                            <Form.Input
                                fluid
                                required={true}
                                icon='lock'
                                iconPosition='left'
                                 placeholder='Password'
                                type='password'
                                size='huge'
                                id="password"
                                onChange={onPasswordChange1}
                            />

                            <Button disabled={loading} color='teal' fluid size='huge' type={'submit'}>
                                Login
                            </Button>
                        </Segment>
                    </Form>

                    <Message>
                        New to us? <Button onClick={onFlagChange}>Sign Up</Button>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Auth;