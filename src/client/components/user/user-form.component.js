import React, {Component} from 'react';
import ErrorsAlert from '../errors-alert.component';

export default class UserForm extends Component {
    state = {
        username: '',
        password: '',
        errors: []
    };

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();

        try {
            await this.props.onSubmit({
                username: this.state.username,
                password: this.state.password
            });
        } catch (e) {
            this.setState({
                errors: e.errors
            });
        }
    };

    render() {
        return (
            <div>
                <p className="page-title">{this.props.pageTitle}</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               required={true}
                               minLength={6}
                               maxLength={36}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required={true}
                               minLength={6}
                               maxLength={36}/>
                    </div>
                    <ErrorsAlert errors={this.state.errors}/>
                    <button type="submit" className="btn btn-primary">
                        {this.props.buttonText}
                    </button>
                </form>
            </div>
        );
    }
}
