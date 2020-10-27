import React from "react";
import './Home.css';
import logo from './logo.png';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
class home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:'',
            flag:false,
            name:'',
            password:'',
            ReEnterPassword:'',
            email:''
        }
    }
    onEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({signInPassword:event.target.value})
    }
    onFlagChange=()=>{
        this.setState({flag:!this.state.flag})
    }
    onSetName=(event)=>{
        this.setState({name:event.target.value})
    }
    onSetEmail=(event)=>{
        this.setState({email:event.target.value})
    }
    onSetPassword=(event)=>{
        this.setState({password:event.target.value})
    }
    
    RegisterUser=()=>{

    }
    onSubmitSignIn=()=>{
        
    }

    render(){
        const fg = this.state.flag;
        if(fg===true)
    {return (
        <div class="ui huge form">
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
        <img src={logo} /> Register!
      </Header>

      <Form size='large'>
        <Segment Raised>
        <Form.Input 
          placeholder='Full Name' 
          size='huge' id="Name" 
          onChange={this.onSetName}/>
          <Form.Input 
          placeholder='E-mail address' 
          size='huge' id="email-address" 
          onChange={this.onSetEmail}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            size='huge'
            id="password"
            onChange={this.onSetPassword}
          />

          <Button color='teal' fluid size='huge' onClick={this.RegisterUser}>
            Register
          </Button>
        </Segment>
      </Form>
      





      
      <Message>
        Already having an account <Button onClick={this.onFlagChange}>Sign In</Button>
      </Message>
      </Grid.Column>
        </Grid>
    </div>
    );}

    return (
        <div class="ui huge form">
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <img src={logo} /> Log-in to your account
      </Header>

      <Form size='large'>
        <Segment Raised>
          <Form.Input 
          fluid icon='user' 
          iconPosition='left'
          placeholder='E-mail address' 
          size='huge' id="email-address" 
          onChange={this.onEmailChange}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            size='huge'
            id="password"
            onChange={this.onPasswordChange}
          />

          <Button color='teal' fluid size='huge' onClick={this.onSubmitSignIn}>
            Login
          </Button>
        </Segment>
      </Form>
      
      <Message>
        New to us? <Button onClick={this.onFlagChange}>Sign Up</Button>
      </Message>
    </Grid.Column>
  </Grid>
  </div>);

    
}

}
export default home;