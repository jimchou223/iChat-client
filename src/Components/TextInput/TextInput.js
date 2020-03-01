import React, { Component } from 'react';

// import classes from './TextInput.module.css'

class TextInput extends Component {
    eventHandler = (event) => {
        event.preventDefault();
        const content = this.refs.content.value;
        this.refs.content.value = ""
        this.props.messageSubmit(content)

    }
    render() {
        const activated = this.props.activated
        return (
            <form
                onSubmit={(event) => this.eventHandler(event)}
                style={{ display: activated ? "block" : "none" }}>
                <textarea ref="content" type="text" />
                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default TextInput;