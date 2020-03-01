import React, { Component } from 'react';

import NavigationItems from '../Navigation/NavigationItems'
import classes from './Toolbar.module.css'
import Logo from '../Logo/Logo';
class toolbar extends Component {
    

    render() {
        return (
            <header className={classes.Toolbar}>
                <Logo></Logo>
                {/* <h1>iChat</h1> */}
                <NavigationItems
                loginStatus={this.props.loginStatus}
                Signup={() => this.props.loginHandler}
                Login={() => this.props.signupHandler}
                clicked={(index) => this.props.clicked(index)} />
            </header>
        );
    }
} 

export default toolbar;