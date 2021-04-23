import { takeEvery, takeLatest } from 'redux-saga/effects';

import { createAction } from '../actions/Booking/Create';
import { create } from './Booking/index';

export default function* rootSaga() {
  yield takeLatest(createAction.getType('REQUEST'), create);
}
