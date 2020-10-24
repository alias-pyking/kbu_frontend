import React, { Component } from "react";
import axios from '../../axios-kbu';
import {Container, Grid} from "semantic-ui-react";

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
            tools = this.state.tools.map(tool => (
                <Grid.Column>
                    
                </Grid.Column>
            ))
        }

        return(
            <Grid relaxed columns={4}>
            </Grid>
        )
    }
}

export default Tools;