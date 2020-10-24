import React from "react";
import { NavLink } from "react-router-dom";
import {Menu} from "semantic-ui-react";

const NavBarItem = (props) => {
    return (
        <Menu.Item
        as={NavLink}
        to={props.to}
        exact={true}
        >
            {props.name}
        </Menu.Item>
    );
}
export default NavBarItem;