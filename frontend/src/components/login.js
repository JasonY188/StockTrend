import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
// import { loginUser } from './actions/index';
import axios from 'axios';

class Login extends Component {

  state = {
    username: '',
    password: '',
    redirect: false,
    error: false
  }

  onSubmit = e => {
    e.preventDefault();
    let { username, password } = this.state;
    let loginObj = { username, password };
    axios.post(`http://localhost:5000/tracker/users`, loginObj)
      .then(response => {
        if (response.data.success) {
          this.setState({ redirect: true })
        } else {
          this.setState({ error: true })
        }
      })
      .catch(e => {
        console.log(e);
      })


  }

  onUserNameChange = e => {
    this.setState({
      username: e.target.value
    })
  }
  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }




  render() {
    return (
      <div>
        {
          this.state.redirect ?
            (
              <Redirect to="/dailypage" />
            )
            :
            <div>
              <form onSubmit={this.onSubmit}>
                <div className="form-group login-form">
                  <input className="login" value={this.state.username} onChange={this.onUserNameChange} type="text" className="form-control" placeholder="Username" />
                  <input className="login" value={this.state.password} onChange={this.onPasswordChange} type="password" className="form-control" placeholder="Password" />
                  <button type="submit" className="btn btn-primary">Login</button>
                  {
                    this.state.error && <h5>Invalid Login</h5>
                  }
                </div>
              </form>
            </div>
        }
      </div>
    );
  }
}


export default Login;

