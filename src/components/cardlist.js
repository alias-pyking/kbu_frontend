import React from 'react';
import Loader from './Loader/Loader';
import {Container, Grid} from "semantic-ui-react";
import CardTool from './CardTool/CardTool';


class Cardlist extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading: true,
            tools:[]
        }
    }

    componentDidMount(){
        
        fetch('https://keepborrowuse.herokuapp.com/tools/')
    .then(response => response.json())
    .then(data => this.setState({loading:false,tools:data})).then(()=>console.log(this.state.tools));
   
  }
  render(){

    const { loading } = this.state;
        let tools = null;
        if(loading){
            tools = <Loader/>;
        } else{
            tools = this.state.tools.map((tool, index) => (
                <Grid.Column key={index}>
                    <CardTool
                    id={tool.id}
                    cost = {tool.cost}
                    name={tool.name}
                    timestamp={tool.timestamp}
                    thumb={tool.images[0]}
                    description={tool.description}
                    />
                </Grid.Column>
            ))
        }

        return(
            <Container>
                <Grid relaxed columns={3}>
                    {tools}
                </Grid>
            </Container>
        )



  }

}
export default Cardlist;