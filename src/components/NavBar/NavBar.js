import React from 'react'
import {Menu, Segment} from 'semantic-ui-react'
import NavBarItem from "./NavBarItem";
import logo from '../../assets/logo1.png'
function NavBar (){
    
    return (
    
        <Segment inverted>
      
            <Menu inverted pointing secondary>
                <img style={{width: '60px'}} src={logo}/> 
                <NavBarItem to='/' name='Home' />
                <NavBarItem to='/tools' name='Tools'  />
                <NavBarItem to='/about' name='About'  />
                <NavBarItem to='/auth' name='Login/Register' />
            </Menu>
        </Segment>
       
    )
}

export default NavBar;