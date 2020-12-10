import React, {useState} from "react";
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import Error from "../../../components/Error/Error";
import axios from '../../../axios-kbu';
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from 'react-router-dom';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user, token } = useAuth();
  const history = useHistory();

  function onFirstNameChange(event) {
    setFirstName(event.target.value);
    if (firstName !== '') {
      setFirstNameError(false);
    }
  }

  function onLastNameChange(event) {
    setLastName(event.target.value);
    if (lastName !== '') {
      setLastNameError(false);
    }
  }

  function onBioChange(event) {
    setBio(event.target.value);
    if (bio !== '') {
      setBioError(false);
    }
  }

  function onProfileChange(event) {
    setProfilePic(event.target.files[0])
  }

  function performValidation() {
    let flag = false;
    if (firstName === '') {
      setFirstNameError(true);
      flag = true;
    }
    if (lastName === '') {
      setLastNameError(true);
      flag = true;
    }
    if (bio === '') {
      console.log('bio');
      setBioError(true);
      flag = true;
    }

    return flag;
  }
  async function handleSubmit(event){
    event.preventDefault();
    if(performValidation()){
      return ;
    }
    setSubmitting(true);
    try{
      const configs = {
        headers: {
          Authorization: `Token ${token}`
        }
      }
      const res = await axios.put(`/profile/${user}/`, configs);
      history.push(`/profile/${user}`)
    } catch (err) {
      setError('Something went wrong, unable to perform edit');
      setSubmitting(false);
    }
  }
  return (
    <Grid textAlign='center'>
      <Grid.Column style={{maxWidth: 600}}>
        {error?<Error error={error}/>:''}
        <Header as={'h1'} color='teal'>
          Edit Your Profile
        </Header>
        <Form size='large'>
          <Segment raised>
            <Form.Input
              error={firstNameError}
              size={'huge'}
              fluid
              placeholder={'First Name'}
              onChange={onFirstNameChange}
              value={firstName}
            />
            <Form.Input
              error={lastNameError}
              size={'huge'}
              fluid
              value={lastName}
              placeholder={'Last Name'}
              onChange={onLastNameChange}
            />
            <Form.TextArea
              error={bioError}
              size={'huge'}
              placeholder={'Bio'}
              onChange={onBioChange}
            />

            <h1>Profile photo</h1>
            <Form.Input
              size={'huge'}
              fluid
              type={'file'}
              onChange={onProfileChange}
            />
            <Button loading={submitting} disabled={submitting} color={'teal'} size={'huge'} type={'submit'}
                    onClick={handleSubmit}> Submit</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default EditProfile;