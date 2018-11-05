import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';

import Navbar from './components/navbar';
import MainPage from './components/mainpage';
import Login from './components/login';
import Admin from './components/admin';
import AddUser from  './components/adduser'
import UpdateUser from './components/updateuser';
import DailyPage from './components/dailypage';
import WeeklyPage from './components/weeklypage';
import MonthlyPage from './components/monthlypage';
import Search from './components/search';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => <MainPage/>} />
          <Route exact path='/navbar' render={()=> <Navbar/>} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/dailypage' render={() => <DailyPage />}/> 
          <Route exact path='/weeklypage' render={() => <WeeklyPage />} />
          <Route exact path='/monthlypage' render={() => <MonthlyPage />} />
          <Route exact path='/search' render={()=> <Search />} />
          <Route exact path='/admin' render={() => <Admin/> } />
          <Route exact path='/adduser' render={() => <AddUser />} />   
          <Route exact path='/updateuser/:id' component={UpdateUser} />
        </Switch>
      </div>
    );
  }
}



export default App;