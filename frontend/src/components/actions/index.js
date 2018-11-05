
import axios from 'axios';
import uniqid from 'uniqueid';
import { mapToChanges } from '../../functions/functions'
import {
    SHOW_ALL_USERS,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    DAILY_TICKER_DATA,
    WEEKLY_TICKER_DATA,
    MONTHLY_TICKER_DATA,
    USER_TICKER_DATA,
    SUPER_GETTER_DATA,
    IEX_DATA
    

} from '../constants/index'



export const showUser = (user) => dispatch => {
    console.log('does show run?')
    axios.get(`http://localhost:5000/tracker/users`)
        .then(response => {
            dispatch({ type: SHOW_ALL_USERS, data: response.data })
        })
}

export const addUser = (user) => dispatch => {
    console.log('does add run?')
    axios.post(`http://localhost:5000/tracker/users/add`, user)
        .then(response => {
            dispatch({ type: ADD_USER, data: response.data })
        })
}

export const editUser = (id, updates) => dispatch => {
    console.log('does edit run', id)
    axios.put(`http://localhost:5000/tracker/users/${id}`, updates)
        .then(response => {
            dispatch({ type: EDIT_USER, data: response.data })
        })
}

export const deleteUser = (id) => dispatch => {
    console.log('does delete run?', id)
    axios.delete(`http://localhost:5000/tracker/users/${id}`, )
        .then(response => {
            dispatch({ type: DELETE_USER, data: response.data })
        })
}

export const getDailyClose = (sym) => dispatch => {
    console.log('does get daily run', sym)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&outputsize=compact&apikey=27OXEMNDGV6KSV3L`)
        .then(response => {
            dispatch({ type: DAILY_TICKER_DATA, data: response.data })
        })
}


export const getWeeklyClose = (sym) => dispatch => {
    console.log('does get week run', sym)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${sym}&outputsize=compact&apikey=27OXEMNDGV6KSV3L`)
        .then(response => {
            dispatch({ type: WEEKLY_TICKER_DATA, data: response.data })
        })
}

export const getMonthlyClose = (sym) => dispatch => {
    console.log('does get monthly run', sym)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${sym}&outputsize=compact&apikey=27OXEMNDGV6KSV3L`)
        .then(response => {
            dispatch({ type: MONTHLY_TICKER_DATA, data: response.data })
        })
}


//multiple symbol requests
//https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5
export const getIEXData = (sym) => dispatch => {
    console.log('does get iex run', sym)
    axios.get(`https://api.iextrading.com/1.0/stock/${sym}/company`)
        .then(response => {
            console.log('response:', response.data)
            dispatch({ type: IEX_DATA, data: response.data })
        })
}

//axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${sym}&types=quote,news,chart&range=1m&last=5`)




// helpers
const getDayPrice = dayPriceObj => {
    let priceArray = Object.values(dayPriceObj)
    let close = priceArray.map(price => price["4. close"])
    let newDayClose = close.slice(0, 12)
    let changes = mapToChanges(newDayClose);
    let final = newDayClose.map((close, index) => ({ amt: close, change: changes[index] }))
    return final;
}

const getWeekPrice = weekPriceObj => {
    let priceArray = Object.values(weekPriceObj)
    let close = priceArray.map(price => price["4. close"])
    let newWeekClose = close.slice(0, 12)
    let changesTwo = mapToChanges(newWeekClose);
    let finalTwo = newWeekClose.map((close, index) => ({ amt: close, change: changesTwo[index] }))
    return finalTwo;
}

const getMonthPrice = monthPriceObj => {
    let priceArray = Object.values(monthPriceObj)
    let close = priceArray.map(price => price["4. close"])
    let newMonthClose = close.slice(0, 12)
    let changesThree = mapToChanges(newMonthClose);
    let finalThree = newMonthClose.map((close, index) => ({ amt: close, change: changesThree[index] }))
    return finalThree;
}
// ---

