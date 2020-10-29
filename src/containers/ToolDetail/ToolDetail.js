import React, { Component } from "react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import {CardHeader} from "semantic-ui-react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";


class ToolDetail extends Component {

    state = {
        id:null,
        user:'',
        name:'',
        images: null,
        description:'',
        quantity:null,
        cost: null,
        status:'',
        reviewUrl:'',
        timestamp:null,
        loading:true,
    }

    async componentDidMount() {
        const path = window.location.pathname;
        try{
            const res = await axios.get(path);
            const { data } = res;
            console.log(data);
            this.setState(previousState => {
                return {
                    ...previousState,
                    id: data.id,
                    user:data.user,
                    name:data.name,
                    images:data.images,
                    description:data.description,
                    quantity: data.quantity,
                    cost: data.cost,
                    status: data.status,
                    timestamp:data.timestamp,
                    reviewsUrl:data.reviews,
                    loading:false,
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let tool = null;
        const { loading } = this.state;
        const state = {...this.state};
        if (loading){
            tool = <Loader/>;
        } else{
            tool = (
                <div>
                    <CardHeader>
                        <h2>{ state.name }</h2>
                    </CardHeader>
                    <div>
                        <ImageSlider images={state.images}/>
                    </div>
                </div>
            )
        }

        return(
            <div>
                {tool}
            </div>
        )
    }
}

export default ToolDetail;