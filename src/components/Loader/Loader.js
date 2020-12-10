import React from "react";
import styles from './Loader.module.css';
import {Dimmer, Image, Segment, Loader} from "semantic-ui-react";

function loader() {
  return (
    <Segment>
      <Loader active/>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
    </Segment>
  )
}

export default loader;