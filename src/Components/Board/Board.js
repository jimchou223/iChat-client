import React from 'react';

import TextInput from '../TextInput/TextInput'
import Aux from '../../hoc/Aux';
import classes from './Board.module.css';
import Messages from '../Messages/Messages';

const board = (props) => (
    <Aux className={classes.Board}>

        <Messages
            currentUser={props.currentUser}
            messages={props.messages}
            activated={props.activated}>

        </Messages>
        <TextInput 
            activated={props.activated} 
            className={classes.TextInput}
            messageSubmit = {props.messageSubmit} ></TextInput>
    </Aux>
);

export default board;