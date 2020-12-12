import React, {useEffect, useState} from 'react';
import {Container, Grid, Segment} from "semantic-ui-react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import Card from './Card';


function Sell(props) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = props.userName;
  useEffect(() => {
    const configs = {
      headers: {'Authorization': `Token ${props.token}`}
    };
    let path = `/profile/${userName}/transactions/`;
    if (props.buy) path += '?tr=b';

    (async function fetchTransactions() {
      let res = await axios.get(path, configs);
      const {data} = res;
      // console.log(data);
      setTransactions(data.results);
      setLoading(false);
    })();
  }, []);

  let displayTransactions = null;

  if (loading) {
    displayTransactions = <Loader/>;
  } else {

    displayTransactions = transactions.map((transaction, index) => (
      <Grid.Column key={index}>
        <Card
          id={transaction.id}
          toolId={transaction.tool ? transaction.tool.id:''}
          costPerHour={transaction.cost_per_hour}
          cost={transaction.cost}
          paymentStatus={transaction.payment_status}
          sellingTime={transaction.selling_time}
          completionTime={transaction.expiration_time}
          status={transaction.status}
          buyer={transaction.buyer}
          seller={transaction.seller}
          name={transaction.tool ? transaction.tool.name:''}
          description={transaction.tool?  transaction.tool.description:''}
          image={transaction.tool ? transaction.tool.images[0]:''}
        />
      </Grid.Column>
    ))
  }
  return (
      <Segment raised style={{borderColor: 'teal', borderRadius: '5px'}}>
        <Grid relaxed columns={1}>
          {displayTransactions}
        </Grid>
      </Segment>
  )

}

export default Sell;