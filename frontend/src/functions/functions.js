import React, { Component } from 'react';
import upArrow from '../assets/if_Stock Index Up_48x48.png';
import downArrow from '../assets/if_Stock Index Down_48x48.png';
import NumberFormat from 'react-number-format';

// input type array of numbers, output array of objects
// mapToChanges() will take in compare each corresponding closing price
// if value of array postion i = value of array position i+1 then set  amt: arr[i], change: NONE, percentageChange: 0 and push all 3 into array of change
// if value of array postion i > value of array position i+1 then set  amt: arr[i], change: UP, percentageChange: 0 and push all 3 into array of change
// if value of array postion i < value of array position i+1 then set  amt: arr[i], change: DOWN, percentageChange: 0 and push all 3 into array of change
// change.reverse() will reverse the positions of each value, so when showArrow() renders the arrows the oldest value will render on the most left and newest value will render on the most right
function mapToChanges(arr) {
    let change = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1 || arr[i] === arr[i + 1]) {   // we are at the very first day of the range (no comparison)
            change.push({
                amt: arr[i],
                change: "NONE",
                percentChange: 0
            });
        } else if (arr[i] > arr[i + 1]) {
            let percentChange = (arr[i] - arr[i + 1]) / arr[i + 1] * 100;
            change.push({
                amt: arr[i],
                change: "UP",
                percentChange
            });
        } else {
            let percentChange = (arr[i] - arr[i + 1]) / arr[i] * 100;
            
            change.push({
                amt: arr[i],
                change: "DOWN",
                percentChange
            })
        }
    }
    // console.log(change)
    return change.reverse();
}

// input type array of objects, output type array of objects
//showArrow() will take the array of objects and render each object depending on the change.change value
//if change.change = "UP", return upArrow image, value of amt, value of percentChange
const showArrow = change => {
    switch (change.change) {
        case "UP":          
                return (
                    <div className="col">
                        <img src={upArrow}/><br/>
                        < NumberFormat value={change.amt} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'}/><br/>            
                        < NumberFormat value={change.percentChange} displayType={'text'} thousandSeparator={true} decimalScale={2} suffix={'%'}/>
                    </div>
                )
          
        case "DOWN":
                return (
                    <div className="col">
                        <img src={downArrow}/><br/>
                        < NumberFormat value={change.amt} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'}/><br/>
                        < NumberFormat value={change.percentChange} displayType={'text'} thousandSeparator={true} decimalScale={2} suffix={'%'}/>
                    </div>
                )        
        case "NONE":
            return <h4></h4>

    }
}

//input type object of object, output type array of objects
//getPriceSet() normalizes dayPriceObj object
//dayPriceObj is a object of 100 most recent prices(high, low, close, volume) from response.data
//getPriceSet() will map the object into a array of ONLY closing prices,
//Object.values will convert dayPriceObj into an array of objects
//array will be slice and return only 12 of the most recent closing prices
//12 is static, future version will make 12 dynamic and user can determine how many closing prices to return
//shortened array will be sent as an argument to mapToChanges()
//changes array will now be a array of objects that contains the most 12 recent objects
//each object {amt: closing price, change: upArrow or downArrow, percentageChange: % up or down}
const getPriceSet = dayPriceObj => {
    let priceArray = Object.values(dayPriceObj)
    let close = priceArray.map(price => price["4. close"])
    let newDayClose = close.slice(0, 12)
    // console.table(newDayClose);
    let changes = mapToChanges(newDayClose);
    // console.table(changes)
    let final = newDayClose.map((close, index) => ({ amt: close, change: changes[index] }))
    // console.table(final)
    return final;
}

//input type object of object, output type array of object
//getCoInfo() normalizes dayInfoObj object
//dayInfoObj is an meta data part of the response.data containing company ticker symbol, date, size, time zone
//Object.values will convert dayInfoObj into an array then be assigned to infoArray 
const getCoInfo = dayInfoObj => {
    let infoArray = Object.values(dayInfoObj)

    return infoArray;
}

//input type object of objects, output type array of objects
//getCurrentClose() normalizes dayPriceObj object
//dayPriceObj is data part of the response.data
//getCurrentClose() will map the object into a array of all prices info(high, low, close, volume)
//Object.values will convert dayPriceObj into an array of objects
//array will be slice and return only 1, position 0, the most recent(today's) price info(high, low, close, volume)
const getCurrentClose = dayPriceObj => {
    let closeArray = Object.values(dayPriceObj)
    let close = closeArray.map(x => x)
    let todayClose = close.slice(0, 1)
    // console.log(todayClose)
    return todayClose;
}


export { mapToChanges, showUpArrow, showDownArrow, showArrow, getPriceSet, getCoInfo, getCurrentClose };

const showUpArrow = () => <img className="arrow" src={upArrow} />
const showDownArrow = () => <img className="arrow" src={downArrow} />



