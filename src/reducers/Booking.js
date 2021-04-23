import { Reducers } from '../packages/redaction/index';

import { createReducer } from './Booking/index';

const reducers = Reducers(
  createReducer
);

export default reducers.create();
