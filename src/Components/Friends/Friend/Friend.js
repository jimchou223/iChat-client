import React from 'react';

import userIamge from '../../../assets/images/user.png'
import classes from './Friend.module.css'



const friend = (props) => (
    <div style={{backgroundColor: props.show? "lightblue" : "white"}} onClick={props.clicked} className={classes.Friend}>
        <img alt="user icon"  src={userIamge}></img>
        <h2>{props.children}</h2>

    </div>
)

export default friend;