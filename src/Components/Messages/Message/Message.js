import React from 'react';

import classes from './Message.module.css';

const message = (props) => {
    let classesType = props.type === 'send' ? [classes.Send] :[classes.Receive]
    // if (props.type == 'send') {
        
    // } else if (props.type == 'receive') {
    //     messageFrom = (<div className={classes.Message}>
    //         <p>I am a message from {props.owner}</p>
    //         <small>Time: 2020/2/7</small>
    //     </div>
    // }

    return (
        <div className={classesType.join(' ')}>
            {props.children}
        </div>
    )
}

export default message;