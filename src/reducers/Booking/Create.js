import update from 'immutability-helper';
import { get } from 'lodash';

import { DefaultReducer } from '../../packages/redaction/index';
import { createAction } from '../../actions/Booking/Create';

export const reducer = DefaultReducer({
  action: createAction,
  key: 'create'
});

function onBookingCreateFulfilled(state, action) {
  console.log('FUFUFUF', state);
  const payload = get(action, 'payload');
  const bookings = get(state, 'bookings.data', []);
  const updated = update(bookings, { $push: [payload] });

  return update(state, {
    bookings: {
      data: { $set: updated }
    },
    create: {
      requesting: { $set: false },
      pending: { $set: false },
      fulfilled: { $set: true },
      error: { $set: false },
      data: { $set: payload }
    }
  });
}

reducer.replaceFunction(
  createAction.getType('FULFILLED'),
  onBookingCreateFulfilled
);

export default reducer.create();
