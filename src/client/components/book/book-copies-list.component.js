import React, {Component} from 'react';

import BookCopy from './book-copy.component';
import ApiService from '../../services/api';

export default class BookCopiesList extends Component {
    allCopies = [];

    state = {
        currentCopies: []
    };

    onClickAll = () => {
        this.setState({
            currentCopies: this.allCopies
        });
    };

    onClickAvailable = () => {
        this.setState({
            currentCopies: this.allCopies.filter(
                bookCopy => bookCopy.holder === undefined
            )
        });
    };

    onClickOccupied = () => {
        this.setState({
            currentCopies: this.allCopies.filter(
                bookCopy => bookCopy.holder !== undefined
            )
        });
    };

    onClickAddCopy = async () => {
        let bookCopy = await ApiService.addBookCopy(this.props.bookId);
        this.allCopies.push(bookCopy);

        this.setState({
            currentCopies: this.allCopies
        });
    };

    onBookCopyUpdate = (bookCopyId, holderData) => {
        this.allCopies.forEach((bookCopy) => {
            if (bookCopy.id !== bookCopyId) {
                return;
            }
            bookCopy.holder = holderData.holder;
            bookCopy.returnDate = holderData.returnDate;
        });

        this.setState({
            currentCopies: this.allCopies
        });
    };

    onBookCopyRemove = (bookCopyId) => {
        this.allCopies = this.allCopies.filter(bookCopy => {
            return bookCopy.id !== bookCopyId;
        });

        this.setState({
            currentCopies: this.state.currentCopies.filter(bookCopy => {
                return bookCopy.id !== bookCopyId;
            })
        });
    };

    async componentDidMount() {
        this.allCopies = await ApiService.getBookCopies(this.props.bookId);

        this.setState({
            currentCopies: this.allCopies
        });
    }

    render() {
        return (
            <div className="book-copies">
                <div className="book-copies-header">
                    <p className="book-copies-title">Copies</p>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-outline-primary"
                                onClick={this.onClickAll}>
                            All
                        </button>
                        <button type="button" className="btn btn-outline-primary"
                                onClick={this.onClickAvailable}>
                            Available
                        </button>
                        <button type="button" className="btn btn-outline-primary"
                                onClick={this.onClickOccupied}>
                            Occupied
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary"
                            onClick={this.onClickAddCopy}>
                        Add new copy
                    </button>
                </div>
                <div>
                    {
                        this.state.currentCopies.map(bookCopy => {
                            return <BookCopy key={bookCopy.id} bookCopy={bookCopy}
                                             bookId={this.props.bookId}
                                             onUpdate={this.onBookCopyUpdate}
                                             onRemove={this.onBookCopyRemove}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}
