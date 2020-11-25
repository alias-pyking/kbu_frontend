import React from 'react';
import { Card, Image } from "semantic-ui-react";
import {getTimeAgo} from '../../utilities/util';
import {Link} from "react-router-dom";




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
        <Card as={Link} to={`/tools/${props.id}`}>
            <Image src={ props.thumb } wrapped ui={false}/>
            <Card.Content>
                <Card.Header className='theme-color'>{ props.name }</Card.Header>
                <Card.Meta>
                    <span className='date'>Added {getTimeAgo(props.timestamp)}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
                <span>
          <i class="rupee sign icon"></i>
          {props.cost}
        </span>
            </Card.Content>
        </Card>
    );
}

export default cardTool;