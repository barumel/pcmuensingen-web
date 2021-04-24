import { takeEvery, takeLatest } from 'redux-saga/effects';

import { whoAmIAction } from '../actions/User/WhoAmI';
import { whoAmI } from './User/index';

export default function* userRootSaga() {
  yield takeLatest(whoAmIAction.getType('REQUEST'), whoAmI);
}
