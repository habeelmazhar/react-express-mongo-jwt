import React, { Component } from 'react';

export default class  extends Component {

    componentWillMount() {
        if (window.localStorage.getItem("_id")){
            window.localStorage.removeItem("_id");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("name");

            this.props.history.push('/login');
            
        }
    }

    render() {
        return (
            <div>

            </div>            
        );
    }
}