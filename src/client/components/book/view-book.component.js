import React, {Component} from 'react';

import BookCopiesList from './book-copies-list.component';
import ApiService from '../../services/api';

export default class ViewBook extends Component {
    state = {
        title: '',
        author: '',
        releaseYear: ''
    };

    bookId = this.props.match.params.id;

    async componentDidMount() {
        let bookData = await ApiService.getBook(this.bookId);
        this.setState({
            title: bookData.title,
            author: bookData.author,
            releaseYear: bookData.releaseYear
        });
    }

    render() {
        return (
            <div>
                <p className="page-title">Book #{this.bookId}</p>
                <div className="book-details">
                    <p>Title: {this.state.title}</p>
                    <p>Author: {this.state.author}</p>
                    <p>Release Year: {this.state.releaseYear}</p>
                </div>
                <BookCopiesList bookId={this.bookId}/>
            </div>
        );
    }
}
