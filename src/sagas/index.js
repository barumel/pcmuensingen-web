import { all } from 'redux-saga/effects';

import bookingSagas from './Booking';
import userSagas from './User';

export default function* rootSaga() {
  yield all([
    bookingSagas(),
    userSagas()
  ]);
}
