import { DefaultReducer } from '../../packages/redaction/index';
import { bookingsAction } from '../../actions/Booking/Bookings';

export const reducer = DefaultReducer({
  action: bookingsAction,
  key: 'bookings'
});

export default reducer.create();
