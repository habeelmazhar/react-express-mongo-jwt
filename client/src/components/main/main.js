import React, { Component } from 'react';

// CSS
import './main.css';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            message: ''
        };

        this.onToken = this.onToken.bind(this);
    }

    render() {


        return (
            <h2>Main</h2>
        );
    }
}

export default Todo