import { combineReducers } from 'redux';
import bookingReducers from './Booking';

export default combineReducers({
  foo: () => 'foo',
  booking: bookingReducers
});
