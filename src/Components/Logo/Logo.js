import React from 'react';

import chatLogo from '../../assets/images/chat.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        
        <img alt="message icon" src={chatLogo}></img>
        <h2>iChat</h2>
    </div>

);

export default logo;