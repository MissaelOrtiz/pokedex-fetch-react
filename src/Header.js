import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <div className="title">The Absolute Pokedex</div>
                <div className="links">
                    <NavLink
                        to="/"
                        exact
                        className="nav-link"
                        activeClassName="active"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/pokemon"
                        exact
                        className="nav-link"
                        activeClassName="active"
                    >
                        Index
                    </NavLink>
                </div>
            </div>
        );
    }
}