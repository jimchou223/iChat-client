import React from 'react';

import Message from './Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';


const Messages = (props) => {
    let messageFrom;
    let allMessage = <h3>Please click on friend to start chating</h3>

    const ROOT_CSS = css({
        height: 650,
        mode: "button",
      });
    

    if (props.activated) {
        allMessage = props.messages.map((el, i) => {
            // console.log(Date.parse(el.time).toLocaleString('en-US',{ hour12: false }).substring(4,24))
            const timeString = Date.parse(el.time)
            const time = new Date(timeString).toLocaleString('en-US',{ hour12: false }).substring(0,24)


            // console.log(typeof el.time)
            // let time = Date(el.time).toLocaleString('en-US',{ hour12: false }).substring(4,24)
            if (el.sender === props.currentUser) {
                messageFrom = 'send'
            } else {
                messageFrom = 'receive'
            }
            // console.log(typeof el.time)

            return (

                <Message key={i} type={messageFrom}><p>{el.content}</p><small>{time}</small></Message>

            )

        })
    }

    return (
        <ScrollToBottom className={ROOT_CSS}>
            {allMessage}
            
        </ScrollToBottom>
    );
}

export default Messages;