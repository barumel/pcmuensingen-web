import { Reducers } from '../packages/redaction/index';

import {
  bookingsReducer,
  createReducer
} from './Booking/index';

const reducers = Reducers(
  bookingsReducer,
  createReducer
);

export default reducers.create();
