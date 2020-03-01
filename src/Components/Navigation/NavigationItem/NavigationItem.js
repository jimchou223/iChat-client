import React from 'react';

import classes from './NavigationItem.module.css'


const navigationItem = (props) => (
    <li className={classes.NavigationItem}><button  onClick={props.clicked}>{props.children}</button></li>
)

export default navigationItem;