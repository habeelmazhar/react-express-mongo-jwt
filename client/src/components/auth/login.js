import React, { Component } from 'react';

import './auth.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: "", password: "" };

        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        if (e.target.id === "email")
            this.setState({ username: e.target.value });
        else if (e.target.id === "password")
            this.setState({ password: e.target.value });
    }

    loginUser() {
        let self = this;

        let data = {
            email: this.state.username,
            password: this.state.password,
        };

        // let ip = window.location.hostname + ':' + window.location.port;
        let ip = window.location.hostname + ':8080';
        console.log(ip);

        fetch('http://' + ip + '/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.status === 'success') {
                window.localStorage.setItem('JWT', res.data.token);
                window.localStorage.setItem("_id", res.data.user._id);
                window.localStorage.setItem("email", res.data.user.email);

                self.props.history.push('/home');

            }
            else if (res.status === 'failed') {
                alert('Invalid username / password');
            }

        }).catch(err => {
            console.log('err', err);
            alert('Connectivity issue with server');
        });
    }

    render() {
        return (
            <div className="row">
                <h2 className="left">Login</h2>
                <div className="col s12">
                    <div className="input-field inline">
                        <input id="email" type="email" className="validate loginInput" value={this.state.username} onChange={this.handleChange} />
                        <label htmlFor="email" data-error="wrong" data-success="right">User name</label>
                    </div>
                </div>
                <div className="col s12">
                    <div className="input-field inline">
                        <input id="password" type="password" className="validate loginInput" value={this.state.password} onChange={this.handleChange} />
                        <label htmlFor="password" data-error="wrong" data-success="right">Password</label>
                    </div>
                </div>
            </div>
        );
    }
}
