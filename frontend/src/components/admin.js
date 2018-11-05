import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUser, deleteUser} from './actions/index'
import AddUser from './adduser'
import Navbar from './navbar';

class Admin extends Component{
    state = {
       
    }

    //on page load showUser, a action creator, will retrieve all users in the mongoose
    componentWillMount(){
        this.props.showUser()
    }


    //will grab selected id on onClick, send to deleteUser, a action creator
    onDeleteClick = (e) => {
        let removeUser = e.target.value //this captures the selected id
         console.log(removeUser)
        this.props.deleteUser(removeUser)
    }

    
    render(){
        //Users is passed in from reducer from mapStateToProps
        const { users } = this.props.Users
        console.log(this.props.Users.users)
        return(
            <div className="container">
                <Navbar />
                <h3>This is the admin page</h3>
                {
                    users && users.map((x, index) => {
                    return(
                        <div className="col-12" key={index}>
                            <div className="row">
                                <div className="col">
                                    <p>{x.username + " " + x.password + " " + x.email + " " + x._id} </p>
                                    
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-danger" value={x._id} onClick={this.onDeleteClick}>X</button>
                                    <Link to={`/updateuser/${x._id}` }>Click to Edit</Link>
                                    
                                </div>
                            </div>       
                        </div>
                    )
                })}
                <h4>Add a new user </h4>
                <AddUser />
            </div>
            

        );
    }

}


const mapPropsToDispatch = dispatch => ({
    showUser: () => dispatch(showUser()),
    deleteUser: user => dispatch(deleteUser(user))
})

const mapStateToProps = state => ({
    Users: state.Users
})

export default connect(mapStateToProps, mapPropsToDispatch)(Admin);
