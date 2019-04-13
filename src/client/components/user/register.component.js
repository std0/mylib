import React, {Component} from 'react';

import UserForm from './user-form.component';
import ApiService from '../../services/api';

export default class Register extends Component {
    pageTitle = 'Register';

    buttonText = 'Register';

    onSubmit = async userData => {
        await ApiService.register(userData);
        this.props.history.push('/login');
    };

    render() {
        return (
            <UserForm pageTitle={this.pageTitle} buttonText={this.buttonText}
                      onSubmit={this.onSubmit}/>
        );
    }
}
