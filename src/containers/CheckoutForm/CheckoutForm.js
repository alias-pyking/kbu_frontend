import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Button, Form, Input, Label, Segment} from "semantic-ui-react";
import axios from '../../axios-kbu';
import {useAuth} from "../../contexts/AuthContext";
import Error from "../../components/Error/Error";
import { useHistory } from 'react-router-dom';


function CheckoutForm(props) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const {token} = useAuth();
  const history = useHistory();
// Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

// Handle form submission.
  async function handleSubmit(event) {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    // add these lines
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: card
    });
    setLoading(true);
    try {
      const data = {
        email,
        payment_method_id: paymentMethod.id
      }
      const configs = {
        headers: {
          Authorization: `token ${token}`
        }
      }
      const res = await axios.post(`/transactions/${props.transactionId}/pay/`, data, configs);
      console.log(res.data);
      setLoading(false);
      setError('');
      history.push('/tools')
    } catch (err) {
      setError('Unable to complete payment, Something went wrong,' +
        ' if your amount is deducted it will be reversed soon');
      setLoading(false);

    }
  }

  return (
    <Form onSubmit={handleSubmit} className="stripe-form">
      <Segment raised>
        {error?<Error error={error} />:''}
        <Form.Field>
          <Label size={'huge'}> Enter your email Address </Label>

          <Input fluid size={"huge"} id="email" name="name"
                 type="email"
                 placeholder="some.user@somedomain.com" required
                 value={email} onChange={(event) => {
            setEmail(event.target.value)
          }}/>
        </Form.Field>
        <Form.Field>
          <Label size={'huge'}>Card </Label>
          <CardElement id="card-element" onChange={handleChange}/>
        </Form.Field>
        <br></br>
        <Button loading={loading} color={"teal"} type="submit" className="submit-btn">
          Submit Payment
        </Button>

      </Segment>
    </Form>
  )
    ;
};
export default CheckoutForm;