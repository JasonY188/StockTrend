import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './login';
import AddUser from './adduser';
import updownlogo from '../assets/icons8-up-down-arrow-80.png';
import allocate from '../assets/icons8-investment-portfolio-80.png';
import profitgraph from '../assets/icons8-profit-80.png';


class MainPage extends Component {
  render() {
    return (

      <div className="container ">
        <div className="header">
          <h4>Stock Trend Snapshot</h4>
        </div>
        <div className="mainContent">
          <div className="headerMainContent">
            <h2>Track the stock market</h2>
            <h3>Take a snapshot & know the direction in Seconds</h3>
          </div>
          <div className="subMain row">
            <div id="leftMain" className="col-md-6">
            </div>
            <div id="rightMain" className="col-md-6">
              <div>
                <p>Are you ever curious about the stock market?</p>
                <p>Do you ever to try read stock charts but do not understand them?</p>
                <p>Stock Trend Snapshot takes a quick picture of your favorite stocks,</p>
                <p>a gives you a simplified visualization of the direction.</p>
                <p>Is your stock going up or going down?  Take a quick look.</p>
                <p>Choose from three time frames and try for yourself</p>
                <Link className="btn btn-primary" to='/dailypage'>Try It Now</Link>
              </div>
              <Login/>
            </div>
          </div>
        </div>
        <div className="subContent row">
          <div className="col-md-4">
            <img src ={updownlogo} />
            <h6 >Follow the major market leaders</h6>
            <p> Track the top companies in the  Nasdaq and S&P 500. Make quick analysis of the direction of the market by following key companies.</p>
          </div>
          <div className="col-md-4">
            <img src = {allocate} />
            <h6>Customize your own Portfolio</h6>
            <p>Build your own portolfio.  Track the direction of the stocks in your portolfio in seconds to make quick decisions.</p>
          </div>
          <div className="col-md-4">
            <img src = {profitgraph} />
            <h6>Take advantage of market ups and downs</h6>
            <p>Profit by making educated decisions to buy, sell, or hold on short to intermediate duration.  Or make investments based on long term market trends.</p>
          </div>
        </div>
        <div className="signUp">
          <h4>Sign up </h4>
          <AddUser />
        </div>
        <div className="main-footer">
        </div>
      </div>
    );
  }
}

export default MainPage;