import React, {Component} from 'react';

import UserForm from './user-form.component';
import ApiService from '../../services/api';

export default class Login extends Component {
    pageTitle = 'Login';

    buttonText = 'Login';

    onSubmit = async userData => {
        await ApiService.login(userData);
        this.props.toggleAuth();
        this.props.history.push('/');
    };

    render() {
        return (
            <UserForm pageTitle={this.pageTitle} buttonText={this.buttonText}
                      onSubmit={this.onSubmit}/>
        );
    }
}
