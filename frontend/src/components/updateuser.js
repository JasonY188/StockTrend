import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link,  Redirect } from 'react-router-dom';
import { editUser } from './actions/index';
import Navbar from './navbar';


class UpdateUser extends Component {
    state = {
        username: '',   //update username
        password: '',   //update password
        confirm: '',    //update confirm passwor
        email: '',      //update email
        badEntry: false,
        redirect: false
    }

    onSubmit = e => {
        e.preventDefault();
        let { username, email, password, confirm } = this.state;
        if (password !== confirm) {
            this.setState({ badEntry: true })
        } else {
            this.props.editUser(this.props.match.params.id, {   //this.props.match.params.id is passed in through <Link to={`/updateuser/${x._id}` }> from Admin Component
                username: this.state.username,                  //username, password, confirm, email, from state is an object
                password: this.state.password,                  //this.props.match.params.id is the user id
                confirm: this.state.confirm,                    //the id and object is passed to axios.put with editUser
                email: this.state.email,
            })
            this.setState({                 //this clears the input fields on submit
                username: '',
                password: '',
                confirm: '',
                email: '',
                badEntry: false,
                redirect: true

            })
        }// () => { console.log(this.state)}
    }

    onUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    onConfirmChange = e => {
        this.setState({
            confirm: e.target.value
        })
    }

    onEmailChange = e => {
        this.setState({
            email: e.target.value
        })
    }


    render() {
        const id = this.props.match.params.id   //this.props.match.params.id is passed in through <Link to={`/updateuser/${x._id}` }> from Admin component
        console.log(id)
        return (
            <div>
                {
                    !!this.state.redirect && <Redirect to="/admin" /> 
                }
                <Navbar />
                <h1>Update Screen</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group custom-form">
                        <label>Username</label>
                        <input type="text" className="form-control" onChange={this.onUsernameChange} value={this.state.username} placeholder="New Username" />
                    </div>
                    <div className="form-group custom-form">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={this.onPasswordChange} value={this.state.password} placeholder="New Password" />
                    </div>
                    <div className="form-group custom-form">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" onChange={this.onConfirmChange} value={this.state.confirm} placeholder="Confirm New Password" />
                    </div>
                    <div className="form-group custom-form">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={this.onEmailChange} value={this.state.email} placeholder="New Email" />
                    </div>

                    <button type="submit" className="btn btn-primary" >Update</button>
                </form >
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    editUser: (id, edits) => dispatch(editUser(id, edits))

})


export default connect(null, mapDispatchToProps)(UpdateUser);