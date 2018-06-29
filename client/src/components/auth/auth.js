import React, { Component } from 'react';
import { Redirect } from 'react-router'

export default function (ComposedComponent) {

    class RequireAuth extends Component {

        constructor(props) {
            super(props);
            console.log('Auth middleware constructor');

            this.state = { isAuthenticated: false };
        }

        // Push to login route if not authenticated on mount
        componentWillMount() {
            if (window.localStorage.getItem("_id"))
                this.setState({ isAuthenticated: true });

            if (!this.state.isAuthenticated) {
                console.log('componentWillMount: You need to login first');
                // Use your router to redirect them to login page
            }
        }

        // Push to login route if not authenticated on update
        componentWillUpdate(nextProps) {
            if (!this.state.isAuthenticated) {
                console.log('componentWillUpdate: You need to login first');
                // Use your router to redirect them to login page
            }
        }

        // Otherwise render the original component
        render() {
            if (this.state.isAuthenticated) {
                return <ComposedComponent {...this.props} />
            } else {
                return <Redirect to='/login' />;
            }
        }

    }

    return RequireAuth

}

