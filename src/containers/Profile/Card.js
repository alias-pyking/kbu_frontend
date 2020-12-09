import React from 'react';
import{Image} from "semantic-ui-react";
import {Link} from 'react-router-dom';

function Card(props){

const toolId = props.toolId;
const cost = props.cost;
const costPerHour = props.costPerHour;
let sellingTime = props.sellingTime;
let completionTime = props.completionTime;
const status = props.status;
const name = props.name;
const description = props.description;
const image = props.image;
sellingTime = sellingTime.substring(0, 10);
completionTime = completionTime.substring(0,10);



return(
    <div >
    <div class="ui centered cards" >
<div  class=" card" style={{textAlign:'start',fontFamily:'Josefin Sans'}}>
<div class="image" >

  <Image src={image} as={Link} to={`/tools/${toolId}`}/>
  
</div>
<div></div>
<div  class="content">
  <div class="header">{name}</div>
  <div class="description">
    {description}
  </div>
</div>
<div class="extra content" >
<span class="right floated">
  Buyer : <br/>
  {props.buyer}
  </span>
  <span class="left floated">
    Seller : <br/>
    {props.seller}
    </span>  
</div>
<div class="extra content">
<span class="left floated">
Cost/hr : <br/><i class="rupee sign icon"></i>{costPerHour}
</span>
<span class='right floated'>
Total cost : <br/><i class="rupee sign icon"></i>{cost}
</span>
</div>
<div class="extra content">
    Selling date : {sellingTime}
</div>
<div class="extra content">
    Completion Date : {completionTime}
</div>
<div class="extra content">
    Payment status : {props.paymentStatus}
</div>
</div>
</div>
</div>
);

}

export default Card;