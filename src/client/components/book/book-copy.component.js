import React, {Component} from 'react';
import moment from 'moment';

import LendBookModal from './lend-book-modal.component';
import ApiService from '../../services/api';

export default class BookCopy extends Component {
    state = {
        holder: this.props.bookCopy.holder || '',
        returnDate: this.props.bookCopy.returnDate || '',
        showModal: false
    };

    onClickReturn = async () => {
        await ApiService.returnBookCopy(this.props.bookId,
            this.props.bookCopy.id);

        this.setState({
            holder: '',
            returnDate: ''
        });

        this.props.onUpdate(this.props.bookCopy.id, {});
    };

    onClickRemove = async () => {
        await ApiService.removeBookCopy(this.props.bookId,
            this.props.bookCopy.id);
        this.props.onRemove(this.props.bookCopy.id);
    };

    toggleLendModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    onLend = (holderData) => {
        this.setState(holderData);

        this.props.onUpdate(this.props.bookCopy.id, holderData);
    };

    render() {
        let holderInfo;
        let status = <span className="text-success">Available</span>;
        let button = (
            <button type="button" className="btn btn-primary" onClick={this.toggleLendModal}>
                Lend
            </button>
        );
        if (this.state.holder !== '') {
            status = <span className="text-warning"> Occupied</span>;
            holderInfo = (
                <React.Fragment>
                    <p className="card-text">Holder: {this.state.holder}</p>
                    <p className="card-text">Return date: {
                        moment(this.state.returnDate).format('D MMMM YYYY')
                    }</p>
                </React.Fragment>
            );
            button = (
                <button type="button" className="btn btn-primary" onClick={this.onClickReturn}>
                    Return
                </button>
            );
        }

        return (
            <div className="book-copy card">
                <div className="card-body">
                    <h5 className="card-title">Copy #{this.props.bookCopy.id}</h5>

                    <div className="holder-details">
                        <p className="card-text">Status: {status}</p>
                        {holderInfo}
                    </div>

                    {button}
                    <button type="button" className="btn btn-primary" onClick={this.onClickRemove}>
                        Remove
                    </button>
                    {
                        this.state.showModal === true ? (
                            <LendBookModal bookId={this.props.bookId}
                                           bookCopyId={this.props.bookCopy.id}
                                           toggleModal={this.toggleLendModal}
                                           onLend={this.onLend}/>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}
