import { put } from 'redux-saga/effects';

import { whoAmIAction } from '../../actions/User/WhoAmI';

export default function* whoAmI() {
  try {
    yield put({ type: whoAmIAction.getType('PENDING') });

    const payload = { roles: ['EVERYONE'] };

    yield put({ type: whoAmIAction.getType('FULFILLED'), payload });

    return payload;
  } catch (error) {
    yield put({ type: whoAmIAction.getType('REJECTED'), error });

    return error;
  }
}
