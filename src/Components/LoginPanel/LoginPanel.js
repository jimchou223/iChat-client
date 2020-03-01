import React, { Component } from 'react';

import classes from './LoginPanel.module.css'

class loginPanel extends Component {
    // state = {
    //     username: '',
    //     password: '',
    // }

    // inputChangeHandler = (e) => {
    //     this.setState({ [e.target.name]: e.target.value })
    // }

    submitHandler = (e) => {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        this.props.sendLoginInfo(username, password)

        
    }

    render() {
        return (
            <div>

                <form className={classes.InputWrapper} onSubmit={this.submitHandler}>
                    <h2>Log in</h2>
                    <div className={classes.InputColumn}>
                        <label htmlFor="username">Username: </label>
                        <input
                            // value={this.state.username}
                            tpye="text"
                            name="username"
                            placeholder="Username"
                            ref="username"/>
                    </div>
                    <div className={classes.InputColumn}>
                        <label htmlFor="password">Password: </label>
                        <input
                            // value={this.state.password}
                            tpye="text"
                            name="password"
                            ref="password"
                            placeholder="password"/>
                    </div>
                    <div className={classes.InputColumn}>
                        <input type="submit" />
                    </div>

                </form>
                <small
                    // show={props.showInvalidInfo}
                    style={{ display: this.props.showInvalidInfo ? "block" : "none" }}
                    className={classes.InvalidInfo}>Invalid username or password</small>
            </div>
        );
    }
}





export default loginPanel;