import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { v4 } from 'uuid';
import axios from 'axios';

import { createAction } from '../../actions/Booking/Create';

export default function* createCard(request) {
  try {
    yield put({ type: createAction.getType('PENDING') });
    const { data } = request;

    console.log('DEOTAAAAA', data);

    yield put({ type: createAction.getType('FULFILLED'), payload: data });

    return data;
  } catch (error) {
    yield put({ type: createAction.getType('REJECTED'), error });

    return error;
  }
}
