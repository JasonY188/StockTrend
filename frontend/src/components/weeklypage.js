import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from './navbar';
import { getWeeklyClose, getIEXData } from './actions/index';
import { showArrow, getPriceSet, getCoInfo, getCurrentClose } from '../functions/functions';

class WeeklyPage extends Component {

    state = {
        symbol: '' 

    }


    onSubmit = e => {
        e.preventDefault();
        let sym = this.state.symbol;
        this.props.getWeeklyClose(sym);
        this.props.getIEXData(sym);
        this.setState({
            symbol: '',

        })
    }

    onSymbolChange = e => {
        this.setState({
            symbol: e.target.value
        })
    }



    render() {
        const weekTicker = this.props.weekTicker;
        const iexInfo = this.props.iexData;
        var dayPriceObj = weekTicker["Weekly Time Series"]              //separates closing prices from dayTicker assigns it to dayPriceObj
        if (dayPriceObj) {                                              
            getPriceSet(dayPriceObj)                                    //returns a array of 12 objects of closing prices
        }
        var dayInfoObj = weekTicker["Meta Data"]                         //separates meta data from dayTicker
        if (dayInfoObj) {                                               //getCoInfo normalizes dayInfoObj
            getCoInfo(dayInfoObj)                                       //returns a array of 1 object, company ticker and date
        }
        var dayPriceObj = weekTicker["Weekly Time Series"]              //separates closing pices form dayTicker and assigns it to dayPriceObj
        if (dayPriceObj) {                                              
            getCurrentClose(dayPriceObj)                                //return a array of 1 object, the most current prices, high, low, close, volume
        }

        return (

            <div className="page-container">
                <Navbar />
                <h2 className="page-header">Intermediate Term Snapshot</h2>
                <form className="d-inline-block" onSubmit={this.onSubmit}>
                 
                        <label id="search">Enter A Ticker Symbol</label>
                        <input type="text" id="search" onChange={this.onSymbolChange} value={this.state.symbol} placeholder="AAPL, MSFT, KO, MCD" />
                        <button type="submit" id="search" className="btn btn-primary">Click to snap</button>
                </form >
                <h5>How to read the arrows.  Read left to right.  The left most arrow is the oldest period.  The right most arrow is the current time period.</h5>
                <div className="row info-content">
                    <div className="col-md-6 info-left">
                        <h3>Company Information</h3>
                        {
                            <div>
                            <p>Company: {iexInfo.companyName} </p>
                            <p>Ticker: {iexInfo.symbol} </p>
                            <p>CEO: {iexInfo.CEO} </p>
                            <p>Sector: {iexInfo.sector} </p>
                            <p>Industry: {iexInfo.industry} </p>
                            <p>Exchange: {iexInfo.exchange} </p>
                            <p>Description: {iexInfo.description} </p>

                        </div>
                        }
                    </div>
                    <div className="col-md-6 info-right">
                        <h3>Price Quotes</h3>
                        {
                            dayPriceObj && getCurrentClose(dayPriceObj).map(x=> {
                                return (
                                        <div>
                                        <p>Open: {x["1. open"]}</p>
                                        <p>High: {x["2. high"]}</p>
                                        <p>Low: {x["3. low"]}</p>
                                        <p>Close: {x["4. close"]}</p>
                                        <p>Volume: {x["5. volume"]}</p>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className="arrow-table row">
               
                    {
                        dayPriceObj && getPriceSet(dayPriceObj).map(day => {
                            console.log(day.change)
                            return showArrow(day.change)
                           
                        })
                    }
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
}


const mapPropsToDispatch = dispatch => ({
    getWeeklyClose: (sym) => dispatch(getWeeklyClose(sym)),
    getIEXData: (sym) => dispatch(getIEXData(sym))
})

const mapStateToProps = state => ({
    weekTicker: state.weekTicker,
    iexData: state.iexData

})

export default connect(mapStateToProps, mapPropsToDispatch)(WeeklyPage);


