import React from "react";
import NavBar from '../NavBar/NavBar';
import {Container} from "semantic-ui-react";


const layout = (props) => (
    
    <Container fluid>
        <NavBar/>
        {props.children}
    </Container>
);

export default layout;