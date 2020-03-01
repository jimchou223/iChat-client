import React from 'react';

import Friend from './Friend/Friend'
import classes from './Friends.module.css'
import Board from '../Board/Board'



const friends = (props) => {
    const displayFriends = props.friends.map((friend, index) => {
        const showFriendName = friend.member[0] === props.currentUser ? friend.member[1] : friend.member[0]
        return <Friend
            // clicked={() => this.props.clicked(index)}
            
            show={props.clickedIndex === index}
            clicked = {() => props.clicked(index)}
            key={index}>{showFriendName}</Friend>
    })

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Friends}>
                {displayFriends}

            </div>
            <div className={classes.Board}>
                <Board 
                    currentUser={props.currentUser} 
                    messages={props.messages} 
                    activated={props.clickedIndex !== null}
                    messageSubmit = {props.messageSubmit} />
            </div>
        </div>
    )

}
    



// class Friends extends Component {
//     state = {
//         clickedIndex: null
//     }


//     clickedIndexHandler = (index) => {
//         this.setState({ clickedIndex: index })
//     }



//     render() {
//         const displayFriends = this.props.friends.map((friend, index) => {
//             const showFriendName = friend.member[0] === this.props.currentUser ? friend.member[1] : friend.member[0]
//             return <Friend
//                 // clicked={() => this.props.clicked(index)}
//                 show={this.state.clickedIndex === index}
//                 // clicked={() => this.friendClickedhandler(index)}
//                 clicked={() => this.clickedIndexHandler(index)}
//                 key={index}>{showFriendName}</Friend>
//         })
//         return (
//             <div className={classes.Wrapper}>
//                 <div className={classes.Friends}>
//                     {displayFriends}

//                 </div>
//                 <div className={classes.Board}>
//                     <Board messages={this.props.messages} activated={this.state.clickedIndex !== null} />
//                 </div>
//             </div>
//         );
//     }

// }

export default friends;