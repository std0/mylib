import React, {Component} from 'react';

import ErrorsAlert from '../errors-alert.component';
import ApiService from '../../services/api';

export default class BookForm extends Component {
    state = {
        title: '',
        author: '',
        releaseYear: '',
        errors: []
    };

    onChangeTitle = e => {
        this.setState({
            title: e.target.value
        });
    };

    onChangeAuthor = e => {
        this.setState({
            author: e.target.value
        });
    };

    onChangeReleaseYear = e => {
        this.setState({
            releaseYear: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();

        try {
            await this.props.onSubmit({
                title: this.state.title,
                author: this.state.author,
                releaseYear: this.state.releaseYear
            });
        } catch (e) {
            this.setState({
                errors: e.errors
            });
        }
    };

    async componentDidMount() {
        if (this.props.bookId === undefined) {
            return;
        }

        try {
            let bookData = await ApiService.getBook(this.props.bookId);
            this.setState({
                title: bookData.title,
                author: bookData.author,
                releaseYear: bookData.releaseYear
            });
        } catch (e) {
            this.setState({
                errors: e.errors
            });
        }
    }

    render() {
        return (
            <div>
                <p className="page-title">{this.props.pageTitle}</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               required={true}
                               minLength={3}/>
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.author}
                               onChange={this.onChangeAuthor}
                               required={true}/>
                    </div>
                    <div className="form-group">
                        <label>Release Year: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.releaseYear}
                               onChange={this.onChangeReleaseYear}
                               required={true}
                               minLength={4}
                               maxLength={4}/>
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
