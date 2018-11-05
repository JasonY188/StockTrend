import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';


class Navbar extends Component {

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light">
                    <form className="form-inline">
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/dailypage'
                        >
                            Short Term 
                        </Link>
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/weeklypage'
                        >
                            Intermediate
                        </Link>
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/monthlypage'
                        >
                            Long Term 
                        </Link>
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/search'
                        >
                            Combined 
                        </Link>
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/'
                        >
                            Logout
                        </Link>
                        <Link
                            className="btn btn-outline-primary navbar-custom"
                            to='/admin'
                        >
                            Admin
                        </Link>
                        
                    </form>
                </nav>
             
            </div>
        );
    }
}



export default Navbar;