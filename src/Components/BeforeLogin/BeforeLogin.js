import React from 'react';

import laptopImg from '../../assets/images/laptop.png';
import classes from './BeforeLogin.module.css'
const beforeLogin =(props) => (
    <div className={classes.BeforeLogin}>
        <h1>Please Login or Sign up to start your adventure.</h1>
        <img src={laptopImg} alt="laptop"></img>
    </div>
)

export default beforeLogin;