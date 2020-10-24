import React, { Component } from "react";
import axios from '../../axios-kbu';
import { Grid } from "semantic-ui-react";
import CardTool from '../../components/CardTool/CardTool';


class Tools extends Component{
    state = {
        tools:[],
        loading:true,
    }

    async componentDidMount() {
        try{
            const res = await axios.get('/tools');
            this.setState(previousState => {
                return {
                    ...previousState,
                    tools: res.data,
                    loading:false,
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { loading } = this.state;
        let tools = null;
        if(loading){
            tools = <p>Loading</p>
        } else{
            tools = this.state.tools.map((tool, index) => (
                <Grid.Column key={index}>
                    <CardTool
                    name={tool.name}
                    timestamp={tool.timestamp}
                    thumb={tool.images[0]}
                    description={tool.description}
                    />
                </Grid.Column>
            ))
        }

        return(
            <Grid relaxed columns={4}>
                {tools}
            </Grid>
        )
    }
}

export default Tools;