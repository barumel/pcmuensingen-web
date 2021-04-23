import { all } from 'redux-saga/effects';

import bookingSagas from './Booking';

export default function* rootSaga() {
  yield all([
    bookingSagas()
  ]);
}
