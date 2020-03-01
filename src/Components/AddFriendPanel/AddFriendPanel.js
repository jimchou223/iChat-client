import React, { Component } from 'react';

import classes from './AddFriendPanel.module.css'


class AddFriendPanel extends Component {


    submitHandler = (e) => {
        e.preventDefault();
        const friendName = this.refs.friendName.value;
        this.props.checkRelationship(friendName)
    }


    render() {
        const frienList = this.props.users.map((el, index) => {
            if (el !== this.props.currentUser) {
                return <li key={index}>{el}</li>
            }

        })

        return (
            <div>
                <form className={classes.InputWrapper} onSubmit={this.submitHandler}>
                    <h2>Add friend</h2>
                    <ul>{frienList}</ul>
                    <div className={classes.InputColumn}>
                        <label htmlFor="friendName">Friend Name: </label>
                        <input
                            // value={this.state.friendName}
                            tpye="text"
                            name="friendName"
                            placeholder="friendName"
                            ref="friendName" />
                    </div>

                    <div className={classes.InputColumn}>
                        <input type="submit" />
                    </div>
                    <small>{this.props.addFriendInfo}</small>

                </form>
                <small
                    // show={props.showInvalidInfo}
                    style={{ display: this.props.showInvalidInfo ? "block" : "none" }}
                    className={classes.InvalidInfo}>Invalid username or password</small>
            </div>
        );
    }
}





export default AddFriendPanel;