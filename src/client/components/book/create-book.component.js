import React, {Component} from 'react';

import BookForm from './book-form.component';
import ApiService from '../../services/api';

export default class CreateBook extends Component {
    pageTitle = 'Create New Book';

    buttonText = 'Create book';

    onSubmit = async (bookData) => {
        await ApiService.addBook(bookData);
        this.props.history.push('/');
    };

    render() {
        return (
            <BookForm pageTitle={this.pageTitle} buttonText={this.buttonText}
                      onSubmit={this.onSubmit}/>
        );
    }
}
