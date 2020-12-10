import React, { useEffect, useState } from 'react';
import {Container, Grid} from "semantic-ui-react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import Card from './Card';


function Sell(props){
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    const path = `profile/${props.userN}/transactions/`;
    useEffect(() =>{
        (async function fetchProfile() {
            let res = await axios.get(path, {headers: {'Authorization': `Token ${props.token}`}});
            const {data} = res;
            // console.log(data);
            setTools(data.results);
            setLoading(false);
          })();
    }, []);
     
    let toolsSell = null;
    if(loading){
        toolsSell = <Loader/>;
    } else{

        toolsSell = tools.map((tool, index) => (
            <Grid.Column key={index}>
                <Card
                    id={tool.id}
                    toolId={tool.tool}
                    costPerHour={tool.cost_per_hour}
                    cost={tool.cost}
                    paymentStatus={tool.payment_status}
                    sellingTime={tool.selling_time}
                    completionTime={tool.expiration_time}
                    status={tool.status}
                    buyer={tool.buyer}
                    seller={tool.seller}
                    name={tool.tool.name}
                    description={tool.tool.description}
                    image={tool.tool.images[0]}
                />
            </Grid.Column>
        ))
    }
    return (
        <Container>
        <div className="ui segment raised" style={{borderColor:'teal',borderRadius:'5px'}}>
            <h3>Product you gave on rent :</h3></div>
            <div className="ui segment raised" style={{borderColor:'teal',borderRadius:'5px'}}>
            <Grid relaxed columns={1}>
                {toolsSell}
            </Grid>
            </div>
        </Container>
    )

}

export default Sell;