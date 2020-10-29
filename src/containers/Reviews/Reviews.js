import React, { Component } from "react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import Review from '../../components/Review/Review';

class Reviews extends Component {
    state = {
        reviews:null,
        loading:true
    }

    async componentDidMount() {
        let { reviewsUrl } = this.props;
        if(reviewsUrl === undefined){
            const { toolId } = this.props.match.params;
            reviewsUrl = `/tools/${toolId}/reviews`;
        }
        try{
            const res = await axios.get(reviewsUrl);
            const { data } = res;
            console.log(data);
            this.setState(prevState => {
                return {
                    ...prevState,
                    reviews:data,
                    loading:false,
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { loading } = this.state;
        let reviews = null;
        if(loading){
            reviews = <Loader/>;
        } else {
            reviews = this.state.reviews.map((review, key) => {
                return (
                    <Review
                    key={key}
                    title={review.title}
                    text={review.text}
                    rating={review.stars}
                    timestamp={review.timestamp}
                    />
                )
            });
            if(this.state.reviews.length === 0){
                reviews = <h3>No Reviews for this item are added yet.</h3>
            }
        }
        return (
            <div>
                {reviews}
            </div>
        );
    }
}
export default Reviews;