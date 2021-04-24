import { put } from 'redux-saga/effects';

import { createAction } from '../../actions/Booking/Create';

export default function* createCard(request) {
  try {
    yield put({ type: createAction.getType('PENDING') });
    const { data } = request;

    const payload = {
      ...data,
      status: 'pending'
    };

    yield put({ type: createAction.getType('FULFILLED'), payload });

    return payload;
  } catch (error) {
    yield put({ type: createAction.getType('REJECTED'), error });

    return error;
  }
}
