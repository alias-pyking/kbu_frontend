import React from "react";
import {Card, Rating} from "semantic-ui-react";
import styles from './Review.module.css';
import { getTimeAgo } from "../../utilities/util";

function review(props){
    return (
        <Card className={styles.review}>
            <Card.Content>
                <Card.Header>
                {props.title}
                </Card.Header>
                <Card.Meta>
                    <Rating icon='star' color='teal' disabled maxRating={5} rating={props.rating} />
                </Card.Meta>
                <Card.Description>
                    {props.text}
                </Card.Description>
                <Card.Meta>
                    <span className='date'>Added {getTimeAgo(props.timestamp)}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default review;