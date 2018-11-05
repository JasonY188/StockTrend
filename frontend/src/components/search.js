import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from './navbar';
import { getDailyClose, getWeeklyClose, getMonthlyClose, getIEXData } from './actions/index';
import { showArrow, getPriceSet, getCoInfo, getCurrentClose , mapToChanges} from '../functions/functions';

class Search extends Component {

    state = {
        symbol: '',
        isSubmit: false
    }

    onSubmit = e => {
        e.preventDefault();
        let sym = this.state.symbol;
        this.props.getDailyClose(sym);
        this.props.getWeeklyClose(sym);
        this.props.getMonthlyClose(sym);
        this.props.getIEXData(sym);

        this.setState({
            isSubmit: true
        })
    }

    onSymbolChange = e => {
        this.setState({
            symbol: e.target.value
        })
    }

    getDayPrice = dayPriceObj => {
        let priceArray = Object.values(dayPriceObj)
        let close = priceArray.map(price => price["4. close"])
        let newDayClose = close.slice(0, 12)
        let changes = mapToChanges(newDayClose);
        let final = newDayClose.map((close, index) => ({ amt: close, change: changes[index] }))
        return final;
    }

    getWeekPrice = weekPriceObj => {
        let priceArray = Object.values(weekPriceObj)
        let close = priceArray.map(price => price["4. close"])
        let newWeekClose = close.slice(0, 12)
        let changesTwo = mapToChanges(newWeekClose);
        let finalTwo = newWeekClose.map((close, index) => ({ amt: close, change: changesTwo[index] }))
        return finalTwo;
    }

    getMonthPrice = monthPriceObj => {
        let priceArray = Object.values(monthPriceObj)
        let close = priceArray.map(price => price["4. close"])
        let newMonthClose = close.slice(0, 12)
        let changesThree = mapToChanges(newMonthClose);
        let finalThree = newMonthClose.map((close, index) => ({ amt: close, change: changesThree[index] }))
        return finalThree;
    }



    render() {
        const dayticker = this.props.dayTicker
        const weekticker = this.props.weekTicker
        const monthticker = this.props.monthTicker
        const iexInfo = this.props.iexData;      
        var dayPriceObj = dayticker["Time Series (Daily)"]
        if (dayPriceObj) {
            this.getDayPrice(dayPriceObj)
            
        }
        var weekPriceObj = weekticker["Weekly Time Series"]
        if (weekPriceObj) {
            this.getWeekPrice(weekPriceObj)
            
        }

        var monthPriceObj = monthticker["Monthly Time Series"]
        if (monthPriceObj) {
            this.getMonthPrice(monthPriceObj)
           
        }

        var dayInfoObj = dayticker["Meta Data"]                         //separates meta data from dayTicker
        if (dayInfoObj) {                                               //getCoInfo normalizes dayInfoObj
            getCoInfo(dayInfoObj)                                       //returns a array of 1 object, company ticker and date
        }


        return (

            <div className="container">
                <Navbar />
                <h2 className="page-header">Three Time Frame Snapshot</h2>
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
                <h4>Daily</h4>
                {
                    dayPriceObj && this.getDayPrice(dayPriceObj).map(day => {
                        return showArrow(day.change)
                    })
                }
                </div>
                <div className="arrow-table row">
                <h4>Weekly</h4>
                {
                    weekPriceObj && this.getWeekPrice(weekPriceObj).map(week => {
                        return showArrow(week.change)
                    })
                }
                </div>
                <div className="arrow-table row">
                <h4>Monthly</h4>
                {
                    monthPriceObj && this.getMonthPrice(monthPriceObj).map(month => {
                        return showArrow(month.change)
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

    getDailyClose: (sym) => dispatch(getDailyClose(sym)),
    getWeeklyClose: (sym) => dispatch(getWeeklyClose(sym)),
    getMonthlyClose: (sym) => dispatch(getMonthlyClose(sym)),
    getIEXData: (sym) => dispatch(getIEXData(sym))
})

const mapStateToProps = state => ({
    dayTicker: state.dayTicker,
    weekTicker: state.weekTicker,
    monthTicker: state.monthTicker,
    iexData: state.iexData
})

export default connect(mapStateToProps, mapPropsToDispatch)(Search);











