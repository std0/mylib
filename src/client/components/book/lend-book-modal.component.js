import React, {Component} from 'react';

import ErrorsAlert from '../errors-alert.component';
import ApiService from '../../services/api';

export default class LendBookModal extends Component {
    state = {
        holder: '',
        returnDate: '',
        errors: [],
    };

    onChangeHolder = (e) => {
        this.setState({
            holder: e.target.value
        });
    };

    onChangeReturnDate = (e) => {
        this.setState({
            returnDate: e.target.value
        });
    };

    onSubmit = async (e) => {
        e.preventDefault();

        try {
            let holderData = {
                holder: this.state.holder,
                returnDate: this.state.returnDate
            };

            await ApiService.lendBookCopy(this.props.bookId,
                this.props.bookCopyId, holderData);

            this.props.onLend(holderData);

            this.props.toggleModal();
        } catch (e) {
            this.setState({
                errors: e.errors
            });
        }
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Lend book</h5>
                                <button type="button" className="close"
                                        onClick={this.props.toggleModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Holder: </label>
                                    <input type="text"
                                           className="form-control"
                                           value={this.state.holder}
                                           onChange={this.onChangeHolder}
                                           required={true}/>
                                </div>
                                <div className="form-group">
                                    <label>Return Date: </label>
                                    <input type="text"
                                           className="form-control"
                                           value={this.state.returnDate}
                                           onChange={this.onChangeReturnDate}
                                           required={true}/>
                                </div>
                                <ErrorsAlert errors={this.state.errors}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        onClick={this.props.toggleModal}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
