import { Actions } from '../packages/redaction/index';

import { createAction } from './Booking/Create';
import { bookingsAction } from './Booking/Bookings';

export const actions = Actions(
  bookingsAction,
  createAction
);

export default actions.create();
