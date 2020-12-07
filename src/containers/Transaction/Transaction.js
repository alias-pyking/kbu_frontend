import React, {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {Button, FeedDate, Grid, Header, Input} from "semantic-ui-react";
import Error from "../../components/Error/Error";
import axios from '../../axios-kbu';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";

const stripePromise = loadStripe('pk_test_egX0tzLTlo6Csig6Pauay4LJ00HEFUUYq0');


function Transaction(props) {
  const {user, token} = useAuth();
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationDateError, setExpirationDateError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const {toolId} = props.match.params;

  function onDateChange(event) {
    setExpirationDate(event.target.value);
    if (expirationDate !== '') {
      setExpirationDateError(false);
    }
  }

  async function handleSubmit() {
    if (expirationDate === '') {
      setExpirationDateError(true);
      return;
    }
    setExpirationDateError(false);
    setLoading(true);
    try {
      const configs = {
        headers: {
          Authorization: `token ${token}`
        }
      }
      const data = {
        expiration_time: expirationDate
      }
      const res = await axios.post(`/tools/${toolId}/transactions/`, data, configs);
      console.log(res);
      setLoading(false);
      setTransactionSuccessful(true);
      console.log(res);
      setTransactionId(res.data.id);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  }

  return (
    <Grid textAlign='center'>
      <Grid.Column style={{maxWidth: 600}}>
        {error ? <Error error={error}/> : ''}
        <Header as={'h1'} color='teal'>
          Rent this tool
        </Header>
        {transactionSuccessful ?
          <Elements stripe={stripePromise}>
            <CheckoutForm transactionId={transactionId}/>
          </Elements>
          :<>
            <Input
              fluid
              error={expirationDateError}
              label={'When will you be returning this item ?'}
              type={'datetime-local'}
              onChange={onDateChange}
            />
            <br></br>
            <Button loading={loading} onClick={handleSubmit} color={"teal"}>
              Make Payment
            </Button>
          </>
        }
      </Grid.Column>
    </Grid>
  );
}

export default Transaction;