"use struct";

import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';
import Modal from "../Modal/Modal";
import LoginPanel from '../LoginPanel/LoginPanel';
import BeforeLogin from '../BeforeLogin/BeforeLogin'
import SignupPanel from '../SignupPanel/SignupPanel'
import Friends from '../Friends/Friends'
import axios from 'axios';
import AddFriendPanel from '../AddFriendPanel/AddFriendPanel';


class layout extends Component {
    state = {
        showModal: false,
        showLoginModal: false,
        showSignupModal: false,
        clickedIndex: null,
        currentUser: null,
        currentRoomID: null,
        invalidInfo: false,
        onClickedFriend: null,
        activated: false,
        friends: [],
        messages: [],
        friendList: [],
        users: [],
        addFriendInfo: null,

    }

    modalOpenedHandler = () => {
        this.setState({ showModal: true, addFriendInfo: null })
    }
    modalClosedHandler = () => {
        this.setState({ showModal: false })
        this.setState({ showLoginModal: false })
        this.setState({ showSignupModal: false })
    }

    initHandler = () => {
        this.setState({
            showModal: false,
            showLoginModal: false,
            showSignupModal: false,
            clickedIndex: null,
            currentUser: null,
            currentRoomID: null,
            invalidInfo: false,
            onClickedFriend: null,
            activated: false,
            friends: [],
            messages: [],
            friendList: [],
            users: [],
            addFriendInfo: null,
        })
    }


    modalHandler = (index) => {
        // let enterForm
        if (index === 0 && this.state.currentUser === null) {
            this.setState({ showSignupModal: true })
            // enterForm = <SignupPanel></SignupPanel>
            this.modalOpenedHandler()
        } else if (index === 0 && this.state.currentUser !== null) {
            this.setState({ showSignupModal: false })
            // enterForm = <SignupPanel></SignupPanel>
            this.modalOpenedHandler()
        } else if (index === 1 && this.state.currentUser === null) {
            this.setState({ showLoginModal: true })
            // enterForm = <LoginPanel></LoginPanel>
            this.modalOpenedHandler()
        }
        else if (index === 1 && this.state.currentUser !== null) {
            // this.setState({ currentUser: null })
            this.initHandler()
            // enterForm = <SignupPanel></SignupPanel>
            // this.modalOpenedHandler()
        }
    }
    loginSubmit = (input) => {
        // event.preventDefault();
        this.verifyUserLogin(input)
    }

    verifyUserLogin = (user) => {
        if (user.username === this.state.user.username && user.password === this.state.user.password) {
            this.setState({ login: true, invalidInfo: false, currentUser: user.username })
            this.modalClosedHandler()
            this.getMyFriendsHandler();
        } else {
            this.setState({ invalidInfo: true })
            console.log('Error')
        }

    }

    getMyFriendsHandler = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/findfriends',
            data: {
                username: this.state.currentUser
            }

        })
            .then((response) => {
                const data = response.data
                let friendArr = []
                data.map(el => {
                    el.member.map(ans => {
                        if (ans !== this.state.currentUser) {
                            friendArr.push(ans)
                        }

                    })
                })
                this.findAllUsersHandler()
                this.setState({ friends: data, friendList: friendArr })
            }, (error) => {
                console.log(error);
            });
            
    }

    getMessagesHandler = (id) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/findmessages',
            data: {
                roomID: id
            }

        })
            .then((response) => {
                const data = response.data
                this.setState({ messages: data })
            }, (error) => {
                console.log(error);
            });
    }

    sendMessagesHandler = (content) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/addnewmessage',
            data: {
                roomID: this.state.currentRoomID,
                sender: this.state.currentUser,
                content: content
            }
        })
            .then((response) => {
                // console.log(response)
                this.getMessagesHandler(this.state.currentRoomID)
            }, (error) => {
                console.log(error);
            });
    }

    setClickedIndexHandler = (index) => {
        this.setState({ clickedIndex: index })
        this.setRoomIDhandler(index)

        // console.log(this.state.clickedIndex)
    }

    setRoomIDhandler = (index) => {
        // const index = this.state.clickedIndex;
        const updatedRoomID = this.state.friends[index].roomID
        this.setState({ currentRoomID: updatedRoomID })
        this.getMessagesHandler(updatedRoomID)
    }

    messageSubmitHandler = (value) => {
        this.sendMessagesHandler(value)

    }
    sendLoginInfo = (username, password) => {
        axios({
            method: 'post',
            url: 'https://dev-421319.okta.com/api/v1/authn',

            data: {
                "username": username,
                "password": password
            }

        })
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    this.setState({ currentUser: response.data._embedded.user.profile.firstName })
                    // this.verifyUserLogin(input)
                    this.setState({ login: true })
                    this.setState({ invalidInfo: false })
                    this.modalClosedHandler()
                    this.getMyFriendsHandler();
                }
                // console.log(response)
            }, (error) => {
                console.log(error);
            });
    }

    createNewUserhandler = (firstname, lastname, password, email) => {
        axios({
            method: 'post',
            url: 'https://dev-421319.okta.com/api/v1/users?activate=true',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 00LXsszC1JQ4ZYQfe4m9pCFSIPYd3k3jUaCgHfmVg4'
            },

            data: {
                "profile": {
                    "firstName": firstname,
                    "lastName": lastname,
                    "email": email,
                    "login": email,
                },
                "credentials": {
                    "password": { "value": password }
                }
            }

        })
            .then((response) => {
                console.log(response)
                this.setState({ showLoginModal: true, showSignupModal: false })
            }, (error) => {
                console.log(error);
            });
    }

    createNewChatroomHandler = (friendName) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/addnewchatroom',
            data: {
                "member": [this.state.currentUser, friendName]
            }

        })
            .then((response) => {
                const data = response.data
                console.log(data)
                this.getMyFriendsHandler()
                // this.setState({ showLoginModal: true, showSignupModal: false })
            }, (error) => {
                console.log(error);
            });
    }
    checkRelationship = (friendName, array) => {
        let result = false
        for (let i = 0; i < array.length; i++) {
            if (array[i] === friendName) {
                result = true
                break;
            }
        }
        return result

    }
    checkRelationshipHandler = (friendName) => {
        const result = this.checkRelationship(friendName, this.state.friendList)
        if (!result) {
            this.createNewChatroomHandler(friendName)
            this.modalClosedHandler()
        } else {
            this.setState({ addFriendInfo: "you are friends already" })
        }

    }

    findAllUsersHandler = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/findallusers',

        })
            .then((response) => {
                const data = response.data
                const users = data.map(user => {
                    return user.firstName
                })
                console.log(users)
                this.setState({ users: users })
                // this.setState({ showLoginModal: true, showSignupModal: false })
            }, (error) => {
                console.log(error);
            });
    }


    render() {

        const displayPanel = this.state.currentUser !== null ?
            <Friends
                clicked={this.setClickedIndexHandler}
                clickedIndex={this.state.clickedIndex}
                messages={this.state.messages}
                currentUser={this.state.currentUser}
                friends={this.state.friends}
                activated={this.state.activated}
                messageSubmit={this.messageSubmitHandler}></Friends> : <BeforeLogin></BeforeLogin>
        let loginOrSignup = null;
        if (this.state.showSignupModal && this.state.currentUser === null) {
            loginOrSignup = <SignupPanel
                sendSignupInfo={this.createNewUserhandler} />
        } else if (this.state.showLoginModal && this.state.currentUser === null) {
            loginOrSignup = <LoginPanel
                showInvalidInfo={this.state.invalidInfo}
                // onSubmit={this.loginSubmit}
                sendLoginInfo={this.sendLoginInfo} />
        } else if (!this.state.showLoginModal && !this.state.showSignupModal && this.state.currentUser !== null) {
            loginOrSignup = <AddFriendPanel users={this.state.users} currentUser={this.state.currentUser} friendList={this.state.friendList} addFriendInfo={this.state.addFriendInfo} checkRelationship={this.checkRelationshipHandler} friendList={this.state.friendList} />
        }


        return (

            <Aux>
                <Modal showModal={this.state.showModal} modalClosed={this.modalClosedHandler}>
                    {loginOrSignup}
                </Modal>
                <div className={classes.Toolbar}>
                    <Toolbar loginStatus={this.state.currentUser !== null} clicked={this.modalHandler} />

                </div>

                {displayPanel}

                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>

        );
    }
}

export default layout