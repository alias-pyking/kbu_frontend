import React from 'react';
import { Card, Image } from "semantic-ui-react";

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {Link} from "react-router-dom";
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

function cardTool(props){

    // A bit of formatting of description before showing

    let description = props.description;
    description = description.toString();
    let len = description.length;
    const sliceIndex = description.length < 100 ? description.length : 100;
    description = description.slice(0, sliceIndex);
    if(sliceIndex < len){
        description = description + '...';
    }
    return (
        <Card>
            <Image src={ props.thumb } wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{ props.name }</Card.Header>
        <Card as={Link} to={`/tools/${props.id}`}>
            <Image src={ props.thumb } wrapped ui={false}/>
            <Card.Content>
                <Card.Header className='theme-color'>{ props.name }</Card.Header>
                <Card.Meta>
                    <span className='date'>Added {timeAgo.format(new Date(props.timestamp))}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default cardTool;