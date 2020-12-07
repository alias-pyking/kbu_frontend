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
            tools: []
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('tools/');
            this.setState({
                loading:false,
                tools:res.data.results,
            })
        } catch (err){
            console.log(err);
        }
    }

    render() {
        const loading = this.state.loading;
        let tools = null;
        if (loading) {
            tools = <Loader/>;
        } else {
            tools = this.state.tools.map((tool, index) => (
                <Grid.Column key={index}>
                    <CardTool
                        id={tool.id}
                        cost={tool.cost_per_day}
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
                <Grid relaxed columns={3}>
                    {tools}
                </Grid>
            </Container>
        )


    }

}

export default CardList;