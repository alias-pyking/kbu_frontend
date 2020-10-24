import React, { Component } from "react";
import axios from '../../axios-kbu';

class Tools extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tools:[],
        }
    }

    async componentDidMount() {
        try{
            const res = await axios.get('/tools');
            this.setState(previousState => {
                return {
                    ...this.state,
                    tools: res.data
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return(
            <div>
                Tools Page
            </div>
        )
    }
}

export default Tools;