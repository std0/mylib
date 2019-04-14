import React, {Component} from 'react';

import BookForm from './book-form.component';
import ApiService from '../../services/api';

export default class EditBook extends Component {
    bookId = this.props.match.params.id;

    pageTitle = `Edit Book #${this.bookId}`;

    buttonText = 'Edit book';

    onSubmit = async (bookData) => {
        await ApiService.editBook(this.bookId, bookData);
        this.props.history.push('/');
    };

    render() {
        return (
            <BookForm pageTitle={this.pageTitle} buttonText={this.buttonText}
                      bookId={this.bookId} onSubmit={this.onSubmit}/>
        );
    }
}
