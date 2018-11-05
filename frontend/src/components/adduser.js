import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser} from './actions/index';

class AddUser extends Component {

    state = {
        username: '',
        password: '',
        confirm: '',
        email: '',
        badEntry: false
       
       
    }
    onSubmit = e => {
        e.preventDefault();
        let { username, email, password, confirm } = this.state;
        let addUserObj = { username, password, confirm, email };
        if(password !== confirm) {
            this.setState({ badEntry:true })
        } else {
            this.props.addUser(addUserObj)   //username, password, confirm, email is passed to axios.post by addUser, a action creator
            console.log(addUserObj)
            this.setState({
                username: '',               //clears the input fields on submit
                password: '',
                confirm: '',
                email: '',
                badEntry: false
                
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


    render(){
        return(
            <div className="add-user-form">
                <form onSubmit={this.onSubmit}>
                <div className="form-group add-user-input row">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={this.onUsernameChange} value={this.state.username} placeholder="User Name" />      
                </div>
                <div className="form-group add-user-input row">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onPasswordChange} value={this.state.password} placeholder="Password" />
                </div>
                <div className="form-group add-user-input row">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" onChange={this.onConfirmChange} value={this.state.confirm} placeholder="Confirm Password" />
                </div>
                <div className="form-group add-user-input row">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={this.onEmailChange} value={this.state.email} placeholder="Email" />
                </div>
                <div className="form-group add-user-input row">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                 </form >
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addUser: user => dispatch(addUser(user))
   
})


export default connect(null, mapDispatchToProps)(AddUser);