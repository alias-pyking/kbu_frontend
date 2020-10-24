import React from 'react'
import {Menu, Segment} from 'semantic-ui-react'
import NavBarItem from "./NavBarItem";

function NavBar (){
    return (
        <Segment inverted>
            <Menu inverted pointing secondary>
                <NavBarItem to='/' name='Home' />
                <NavBarItem to='/tools' name='Tools' />
                <NavBarItem to='/about' name='About' />
            </Menu>
        </Segment>
    )
}

export default NavBar;