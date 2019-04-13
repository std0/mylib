import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.scss';

import ApiService from "./services/api";
import Navbar from './components/navbar.component';
import Routes from './components/routes.component';

class App extends Component {
    state = {
        isAuthenticated: null,
    };

    toggleAuth = () => {
        this.setState({
            isAuthenticated: !this.state.isAuthenticated,
        });
    };

    onLogout = async () => {
        await ApiService.logout();
        this.toggleAuth();
        this.props.history.push('/');
    };

    async componentDidMount() {
        let isAuthenticated;
        try {
            await ApiService.getMyInfo();
            isAuthenticated = true;
        } catch (e) {
            isAuthenticated = false;
        }

        this.setState({
            isAuthenticated
        });
    }

    render() {
        if (this.state.isAuthenticated === null) {
            return null;
        }

        return (
            <Router>
                <div className="container">
                    <Navbar isAuthenticated={this.state.isAuthenticated}
                            onLogout={this.onLogout}/>
                    <Routes isAuthenticated={this.state.isAuthenticated}
                            toggleAuth={this.toggleAuth}/>
                </div>
            </Router>
        );
    }
}

export default App;
