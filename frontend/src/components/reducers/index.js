
const initialState = {
  Users: [], //empty array to hold objects from SHOW_ALL_USERS

  dayTicker: [], //empty array to hold objects from DAILY_TICKER_DATA
  weekTicker: [], //empty array to hold objects from WEEKLY_TICKER_DATA
  monthTicker: [], //empty array to hold objects from MONTHLY_TICKER_DATA

  iexData: [],
  
}


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALL_USERS':
      return {
        ...state,
        Users: action.data
      }
    case 'ADD_USER':
      return {
        ...state,
        Users: action.data
      }
    case 'DELETE_USER':
      return {
        ...state,
        Users: action.data
      }
    case 'EDIT_USER':
      return {
        ...state,
        Users: action.data
      }
      case 'DAILY_TICKER_DATA':
      return {
        ...state,
        dayTicker: action.data
      }
      case 'WEEKLY_TICKER_DATA':
      return {
        ...state,
        weekTicker: action.data
      }
      case 'MONTHLY_TICKER_DATA':
      return {
        ...state,
        monthTicker: action.data
      }
      case 'USER_TICKER_DATA':
     return {
       ...state,
       sampleTicker: action.data
     }
     case 'IEX_DATA':
     return {
       ...state,
       iexData: action.data
     }
    default:
      return state;
  }
}

export default rootReducer;