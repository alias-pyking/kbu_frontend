import React from "react";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer';
import {Container} from "semantic-ui-react";


const layout = (props) => (
    
    <Container fluid>
        <NavBar/>
        <div style={{minHeight:"80vh", overflowY:"auto"}}>
        {   props.children}
        </div>
        <Footer/>
    </Container>
);

export default layout;