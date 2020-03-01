import React, { Component } from 'react';

import classes from './NavigationItems.module.css'
import NaivgationItem from './NavigationItem/NavigationItem'
class NavigationItems extends Component {
    // buttonClicked = (index) = {
        
    // }
    
    render() {
        const loginStatus = this.props.loginStatus
        
        let arr = loginStatus ? ['Add friend', 'Log out'] : ['Signup', 'Login']
        let NaviList = arr.map((el, i) => {
            return <NaivgationItem key={el} clicked={() => this.props.clicked(i)}>{el}</NaivgationItem>
        })
        return (

            <ul className={classes.NavigationItems}>
                {NaviList}
            </ul>

        );
    }



    // const beforeLoginInfo = ['Sign up', 'Log in']
    // const afterLoginInfo = ['Add new friend', 'My account', 'Log out']
    // let NaviList = (arr) => {
    //     arr.map(el => {
    //         return <NaivgationItem>{el}</NaivgationItem>
    //     })
    // }



}




export default NavigationItems;