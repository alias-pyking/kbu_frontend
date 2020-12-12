import React, {useEffect, useState} from 'react';
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import {useAuth} from '../../contexts/AuthContext';
import Sell from './Sell';
import {Button, Divider, Form, Grid, Header, Icon, Image, Segment} from 'semantic-ui-react';
import Error from "../../components/Error/Error";


import './Profile.css';
import {Link} from "react-router-dom";


function Profile(props) {
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('')
  const {token, user} = useAuth();
  const configs = {
    headers: {
      'Authorization': `Token ${token}`
    }
  }

  const {userName} = props.match.params;

  useEffect(() => {
      const path = `profile/${userName}`;

      (async function fetchProfile() {
        try {
          const res = await axios.get(path, configs);
          const {data} = res;
          setWallet(data.wallet.money);
          setLastName(data.last_name);
          setFirstName(data.first_name);
          setProfilePic(data.image);
          setBio(data.bio);
          setDateJoined(data.date_joined);
          setLoading(false);
          setEmail(data.email)
        } catch (err) {
          setError('Something went wrong unable to get profile')
        }
      })();

    }

    ,
    []
  )
  ;

  let doj = dateJoined.substr(0, 10);



  if (loading){
    return <Loader/>;
  }

  return (
    <Grid.Column style={{width: "60%", marginLeft: "20%"}}>
      {user === userName? <Segment raised id='walletMain' style={{borderColor: 'teal', borderRadius: '5px'}}>
        <h2>WALLET :</h2>
        <div id='wallet' style={{float: 'right'}}>
          <Icon name="large rupee sign"/><h2>{wallet}</h2>
        </div>
      </Segment>:''}
      <Segment raised style={{borderColor: 'teal', borderRadius: '5px'}}>
        <Grid columns={2}>
          <Grid.Column>
            {user === userName? <Link to={`/profile/${user}/edit`}> <Icon name={'edit'}/> Edit Profile</Link>:''}
            <Image circular alt={'profile'} className="medium" src={profilePic}/>

          </Grid.Column>

          <Grid.Column>
            <h1>ABOUT</h1>
            <Segment raised style={{borderColor: 'teal', borderRadius: '5px'}}>
              <p>{userName}</p>
              <h1>{firstName + ' ' + lastName} </h1>
              <p>{email}</p>
              <p>Joined On | {' ' + doj}</p>
            </Segment>
            <Divider horizontal/>
            <Segment raised style={{borderColor: 'teal', borderRadius: '5px'}}>
              <p>{bio}</p>
            </Segment>

          </Grid.Column>

        </Grid>
        <Divider vertical/>

      </Segment>
      <Grid columns={2}>
        <Grid.Column>
          {user === userName? <div><Header as={Segment} style={{borderRadius:'5px', borderColor:'teal'}}>TOOLS SOLD</Header>
          <Sell token={token} userName={userName}/> </div>:''}
        </Grid.Column>
        <Grid.Column>
          {user === userName? <div><Header as={Segment} style={{borderRadius:'5px', borderColor:'teal'}}>TOOLS BOUGHT</Header>
          <Sell buy token={token} userName={userName}/></div>:''}
        </Grid.Column>
      </Grid>
    </Grid.Column>
  )
}

export default Profile;



