import React, {Component} from 'react';

import Book from './book.component';
import ApiService from '../../services/api';

export default class BooksList extends Component {
    state = {
        books: []
    };

    onBookRemove = id => {
        this.setState({
            books: this.state.books.filter(book => {
                return book.id !== id;
            })
        });
    };

    async componentDidMount() {
        let books = await ApiService.getBooks();
        this.setState({
            books: books
        });
    }

    render() {
        return (
            <div>
                <p className="page-title">Books List</p>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Release Year</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.books.map(book => {
                            return <Book key={book.id} book={book}
                                         onRemove={this.onBookRemove}/>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
