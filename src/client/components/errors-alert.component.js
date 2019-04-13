import React, {Component} from 'react';

export default class ErrorsAlert extends Component {
    render() {
        return this.props.errors.length > 0 ? (
            <div className="form-errors alert alert-danger" role="alert">
                {
                    this.props.errors.map((error, i) =>
                        <p key={i}>{error}</p>)
                }
            </div>
        ) : null;
    }
}
