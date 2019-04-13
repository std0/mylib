import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        let navLinks;
        if (this.props.isAuthenticated === false) {
            navLinks = [
                {
                    link: '/login',
                    title: 'Login',
                },
                {
                    link: '/register',
                    title: 'Register',
                }
            ];
        } else {
            navLinks = [
                {
                    link: '/',
                    title: 'Books',
                },
                {
                    link: '/create',
                    title: 'Create Book',
                }
            ];
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">MyLib</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {
                            navLinks.map(navLink =>
                                <li className="navbar-item" key={navLink.link}>
                                    <Link to={navLink.link} className="nav-link">
                                        {navLink.title}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                    {
                        this.props.isAuthenticated === true ? (
                            <ul className="navbar-nav">
                                <li className="navbar-item">
                                    <button type="button" className="btn btn-outline-secondary"
                                            onClick={this.props.onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        ) : null
                    }
                </div>
            </nav>
        );
    }
}
