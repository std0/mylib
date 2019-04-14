import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './user/login.component'
import Register from './user/register.component';
import BooksList from './book/books-list.component';
import CreateBook from './book/create-book.component';
import EditBook from './book/edit-book.component';

const NotFound = () => (
    <div className="page-title not-found">Page not found</div>
);

export default class Routes extends Component {
    render() {
        let routes;
        if (this.props.isAuthenticated === false) {
            routes = (
                <React.Fragment>
                    <Route path={["/", "/login"]} exact render={
                        props => <Login {...props} toggleAuth={this.props.toggleAuth}/>
                    }/>
                    <Route path="/register" component={Register}/>
                </React.Fragment>
            );
        } else {
            routes = (
                <React.Fragment>
                    <Route path="/" exact component={BooksList}/>
                    <Route path="/create" component={CreateBook}/>
                    <Route path="/view/:id"/>
                    <Route path="/edit/:id" component={EditBook}/>
                </React.Fragment>
            );
        }

        return (
            <Switch>
                {routes.props.children}
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
