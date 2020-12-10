import React from 'react';
import {Icon, Image, Label, LabelGroup} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import styles from "../ToolDetail/ToolDetail.module.css";

function Card(props) {

  const toolId = props.toolId;
  const cost = props.cost;
  const costPerHour = props.costPerHour;
  let sellingTime = props.sellingTime;
  let completionTime = props.completionTime;
  const status = props.status;
  const name = props.name;
  const description = props.description;
  const image = props.image;
  sellingTime = sellingTime? sellingTime.substring(0, 10): 'N/A';
  completionTime = completionTime? completionTime.substring(0, 10): 'N/A';


  return (
    <div>
      <div className="ui centered cards">
        <div className="card" style={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
          <div className="image">

            <Image src={image} as={Link} to={`/tools/${toolId}`}/>

          </div>
          <div></div>
          <div className="content">
            <div className="header">{name}</div>
            <div className="description">
              {description}
            </div>
          </div>
          <div className="content">
          <span className="right floated">
            Buyer : <br/>
            {props.buyer}
            </span>
            <span className="left floated">
              Seller : <br/>
              {props.seller}
              </span>
          </div>
          <div className="content">
              <LabelGroup tag className={styles.toolMeta}>
                <Label color={'yellow'}>
                  <Icon name={'rupee sign'}/>{costPerHour} /hr
                </Label>
                <Label color={'yellow'}>
                  <Icon name={'rupee sign'}/>{cost}
                </Label>
              </LabelGroup>
          </div>
          <div className="content">
            Sold on | {sellingTime}
          </div>
          <div className="content">
            Completion Date | {completionTime}
          </div>
          <div className="content">
            <LabelGroup tag className={styles.toolMeta}>
              <Label color={props.paymentStatus === 'completed' ? 'green' : "red"}>
                {props.paymentStatus === 'completed' ? 'Paid' : 'Not Paid'}
              </Label>
            </LabelGroup>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Card;