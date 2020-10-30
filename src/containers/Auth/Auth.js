import React, {Component, useState} from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { useAuth } from '../../contexts/AuthContext';


function Auth(){
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [flag, setFlag] = useState(true);
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

    function registerUser(ev){
        ev.preventDefault();
        signUp(username, email, password1, password2);
    }

    function onSubmitSignIn(ev){
        ev.preventDefault();
        console.log('logging in');
        login(username, password1);
    }
    if (flag) {
        return (
            <div className="ui huge form">
                <Grid textAlign='center' style={{height: '70vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <img src={logo} alt='something'/> Register!
                        </Header>

                        <Form size='large'>
                            <Segment raised>
                                <Form.Input
                                    placeholder='username'
                                    size='huge' id="username"
                                    onChange={onUserNameChange}/>
                                <Form.Input
                                    type='email'
                                    placeholder='E-mail address'
                                    size='huge' id="email-address"
                                    onChange={onEmailChange}/>
                                <Form.Input
                                    fluid
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
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    size='huge'
                                    id="password2"
                                    onChange={onPasswordChange2}
                                />
                                <Button color='teal' fluid size='huge' onClick={registerUser}>
                                    Register
                                </Button>
                            </Segment>
                        </Form>

                        <Message>
                            Already having an account <Button onClick={onFlagChange}>Sign In</Button>
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
                    <Header as='h2' color='teal' textAlign='center'>
                        <img src={ logo } alt='kbu-logo'/> Log-in to your account
                    </Header>

                    <Form size='large'>
                        <Segment raised>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='username'
                                required
                                size='huge' id="username"
                                onChange={onUserNameChange}/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                size='huge'
                                id="password"
                                onChange={onPasswordChange1}
                            />

                            <Button color='teal' fluid size='huge' onClick={onSubmitSignIn}>
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