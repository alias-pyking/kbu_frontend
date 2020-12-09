import React, {useEffect, useState} from 'react';
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import {useAuth} from '../../contexts/AuthContext';
import Sell from './Sell';
import Buy from './Buy';
import {Button, Form, Grid, Header, Segment} from 'semantic-ui-react';
import Error from "../../components/Error/Error";

import './Profile.css';


function Profile(props) {
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [userName, setUserName] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [wallet,setWallet] = useState('');
  const [editFlag, setEditFlag] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState('');
  const [submitting, setSubmitting] = useState(false);


  const {token, user} = useAuth();
  // console.log(user, token);

  function onEditFlagChange() {
    setEditFlag(true)
  }

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

  function onImagesChange(event) {
    console.log(event.target.files[0]);
    const files = event.target.files;
    const allowedTypes = ['image/jpeg', 'image/gif', 'image/png', 'image/jpg', 'image/x-png'];

    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        setImagesError(`File type ${files[i].type} is not allowed.`);
        return;
      }
    }
    setImagesError('');
    setImages([...images, ...event.target.files]);
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

  async function onSubmit(event) {
    event.preventDefault();
    if (performValidation()) {
      return;
    }
    // const formData = new FormData();
    // formData.append('first_name', firstName);
    // formData.append('last_name', lastName);
    // formData.append('bio', bio);
    const prf = {
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      image: images[0]
    }

    // for(let i = 0; i < images.length; i++){
    //   formData.append('image', images[i]);
    // }

    const configs = {
      headers: {
        Authorization: `token ${token}`,
        'content-type': 'multipart/form-data'
      }
    };
    setSubmitting(true);
    // try {
    //   const res = await axios.put(`/profile/${user}`, formData, configs);
    //   // props.history.push('/tools/'+res.data.id);
    //   setSubmitting(false);
    // } catch (err) {
    //   setError('Something went wrong unable to update info.');
    //   setSubmitting(false);
    // }
    axios.put(`https://keepborrowuse.herokuapp.com/profile/${user}`, prf, configs)

  }

  useEffect(() => {

    const {userN} = props.match.params;
    const path = `profile/${userN}`;

    (async function fetchProfile() {
      let res = await axios.get(path, {headers: {'Authorization': `Token ${token}`}});
      const {data} = res;
      // console.log(data);
      setWallet(data.wallet.money);
      setUserName(data.username);
      setLastName(data.last_name);
      setFirstName(data.first_name);
      setProfilePic(data.image);
      setBio(data.bio);
      setDateJoined(data.date_joined);
      setLoading(false);
      setEmail(data.email)
    })();

  }, []);

  let doj = dateJoined.substr(0,10);

  if (loading) {
    return (

      <Loader/>
    )
  } else { //when user will see his/her own profile , edit icon will be shown ,when they will click on the icon then they can edit there info
    if (userName === user && editFlag === false) {
      return (<div style={{width: "60%", marginLeft: "20%"}}>
      <div id='walletMain' className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
      <h2>WALLET :</h2>
      <div id='wallet'style={{float:'right'}}>
             <i class="large rupee sign icon"><h2 >{ wallet}</h2></i> 
            </div>
      </div>
        <div className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
          <div className="ui two column grid">
            <div className="column">
              <i className="edit icon" onClick={onEditFlagChange}> </i>Edit Profile
              <img alt={'profile'} className="ui medium circular image" src={profilePic}/>

            </div>

            <div className="column">
              <h1>ABOUT :</h1>
              <div className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
                <h1>Name : {' ' + firstName + ' ' + lastName} </h1>
                <p>User Name :{' ' + userName}</p>
                <p>Email : {' ' + email}</p>
                <p>Joined On : {' ' + doj}</p>
              </div>
              <div className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
          <h2>BIO : </h2>
          <p>{bio}</p>
        </div>

            </div>

          </div>
          <div className="ui vertical divider"/>
          
        </div>
        <div className="ui two column grid">
        <div className="column">
          <Sell token={token} userN={userName}/>
          </div>
          <div className="column">
          <Buy token={token} userN={userName}/>
          </div>
          </div>
      </div>)
    }


//when user want to update his/her info 
    else if (userName === user && editFlag === true) {
      return (

        <Grid textAlign='center'>
          <Grid.Column style={{maxWidth: 600}}>
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
                />
                <Form.Input
                  error={lastNameError}
                  size={'huge'}
                  fluid
                  placeholder={'Last Name'}
                  onChange={onLastNameChange}
                />
                <Form.TextArea
                  error={bioError}
                  size={'huge'}
                  placeholder={'Bio'}
                  onChange={onBioChange}
                />

                {imagesError ? <Error error={imagesError}/> : ''}
                <h1>Profile Pic</h1>
                <Form.Input
                  size={'huge'}
                  fluid
                  type={'file'}
                  onChange={onImagesChange}
                />
                <Button loading={submitting} disabled={submitting} color={'teal'} size={'huge'} type={'submit'}
                        onClick={onSubmit}> Submit</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

      )
    }



//when a user will see other user profile
    else {
      return (<div style={{width: "60%", marginLeft: "20%"}}>
        <div className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
          <div className="ui two column grid">
            <div className="column">
              <img alt={'profile-pic'} className="ui medium circular image" src={profilePic}/>

            </div>

            <div className="column">
              <h1>ABOUT :</h1>
              <div className="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
                <h1>Name : {' ' + firstName + ' ' + lastName} </h1>
                <p>User Name :{' ' + userName}</p>
                <p>Email : {' ' + email}</p>
                <p>Date Joined : {' ' + dateJoined}</p>
              </div>
              <div class="ui segment " style={{borderColor:'teal',borderRadius:'20px'}}>
          <h2>BIO : <br/> {bio}</h2>
        </div>
            </div>

          </div>
          <div class="ui vertical divider"/>
        </div>
        
      </div>)
    }


  }


}

export default Profile;



