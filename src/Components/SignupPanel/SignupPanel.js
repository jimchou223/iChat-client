import React, { Component } from 'react';

import classes from './SignupPanel.module.css'

class SignupPanel extends Component {

    submitHandler = (e) => {

        e.preventDefault();
        const firstname = this.refs.firstname.value;
        const lastname = this.refs.lastname.value;
        const password = this.refs.password.value;
        const email = this.refs.email.value
        this.props.sendSignupInfo(firstname, lastname, password, email)



        
    }
    render() {
        return (
            <form className={classes.InputWrapper} onSubmit={this.submitHandler}>
                <h2>Sign up</h2>
                <div className={classes.InputColumn}>
                    <label htmlFor="firstname">Firstname: </label>
                    <input ref="firstname" type="text" name="firstname" placeholder="firstname" />
                </div>
                <div className={classes.InputColumn}>
                    <label htmlFor="lastname">Lastname: </label>
                    <input ref="lastname" type="text" name="lastname" placeholder="lastname" />
                </div>
                <div className={classes.InputColumn}>
                    <label htmlFor="password">Password: </label>
                    <input ref="password" type="text" name="password" placeholder="password" />
                </div>
                <div className={classes.InputColumn}>
                    <label htmlFor="email">Email: </label>
                    <input ref="email" type="text" name="email" placeholder="email" />
                </div>
                {/* <div className={classes.InputColumn}>
                <label htmlFor="intro">Self Intro: </label>
                <input type="text" name="intro" placeholder="intro" />
            </div> */}
                <div className={classes.InputColumn}>
                    <input type="submit" />
                </div>


            </form>
        );
    }
}

export default SignupPanel;