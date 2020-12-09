import React from 'react';
import Loader from './Loader/Loader';
import {Container, Grid} from "semantic-ui-react";
import CardTool from './CardTool/CardTool';
import axios from '../axios-kbu';

class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tools: [],
            tools1:[]
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('tools/top-rated/');
            this.setState({
                loading:false,
                tools:res.data.results,
            })
        } catch (err){
            console.log(err);
        }
        try {
            const res1 = await axios.get('tools/latest/');
            this.setState({
                loading:false,
                tools1:res1.data.results,
            })
        } catch (err){
            console.log(err);
        }
    }

    render() {
        const loading = this.state.loading;
        let tools = null;
        let tools1 = null;
        if (loading) {
            tools = <Loader/>;
        } else {
            tools = this.state.tools.map((tool, index) => (
                <Grid.Column key={index}>
                    <CardTool
                        id={tool.id}
                        cost={tool.cost_per_hour}
                        name={tool.name}
                        timestamp={tool.timestamp}
                        thumb={tool.images[0]}
                        description={tool.description}
                    />
                </Grid.Column>
            ))
            tools1 = this.state.tools1.map((tool, index) => (
                <Grid.Column key={index}>
                    <CardTool
                        id={tool.id}
                        cost={tool.cost_per_hour}
                        name={tool.name}
                        timestamp={tool.timestamp}
                        thumb={tool.images[0]}
                        description={tool.description}
                    />
                </Grid.Column>
                
            ))
        }

        return (
            <Container>
                <h3>Top Rated Products :</h3>
                <Grid relaxed columns={4}>
                    {tools}
                </Grid>
                <h3> Recently Added :</h3>
                <Grid relaxed columns={4}>
                {tools1}
                </Grid>
                
            </Container>
        )


    }

}

export default CardList;