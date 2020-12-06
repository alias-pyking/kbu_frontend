import React from "react";
import { Message } from "semantic-ui-react";

export default function Error(props) {
    return (
        <Message color='red'>
            {props.error}
        </Message>
    )
}