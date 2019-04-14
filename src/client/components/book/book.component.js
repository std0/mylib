import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ApiService from '../../services/api';

export default class Book extends Component {
    onClickRemove = async () => {
        await ApiService.removeBook(this.props.book.id);
        this.props.onRemove(this.props.book.id);
    };

    render() {
        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.author}</td>
                <td>{this.props.book.releaseYear}</td>
                <td>
                    <Link className="action-link" to={'/view/' + this.props.book.id}>View</Link>
                    <Link className="action-link" to={'/edit/' + this.props.book.id}>Edit</Link>
                    <button type="button" className="btn btn-link action-button"
                            onClick={this.onClickRemove}>
                        Remove
                    </button>
                </td>
            </tr>
        );
    }
}
