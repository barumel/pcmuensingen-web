import { combineReducers } from 'redux';
import bookingReducers from './Booking';
import userReducers from './User';

export default combineReducers({
  booking: bookingReducers,
  user: userReducers
});
