import update from 'immutability-helper';
import { get, defaults, cloneDeep } from 'lodash';

import Reducer from './Reducer';

function DefaultReducer({
  action,
  defaultState,
  key
}) {
  const ds = defaults(
    {},
    defaultState,
    { data: undefined }
  );

  function getDefaultData() {
    return cloneDeep(get(ds, 'data'));
  }

  function defaultReducerRequest(state) {
    return update(state, {
      [key]: {
        requesting: { $set: true },
        fulfilled: { $set: false },
        pending: { $set: false },
        error: { $set: false },
        data: { $set: getDefaultData() }
      }
    });
  }

  function defaultReducerPending(state) {
    return update(state, {
      [key]: {
        requesting: { $set: true },
        fulfilled: { $set: false },
        pending: { $set: true },
        error: { $set: false },
        data: { $set: getDefaultData() }
      }
    });
  }

  function defaultReducerFulfilled(state, action) {
    return update(state, {
      [key]: {
        requesting: { $set: false },
        fulfilled: { $set: true },
        pending: { $set: false },
        error: { $set: false },
        data: { $set: get(action, 'payload') }
      }
    });
  }

  function defaultReducerRejected(state, action) {
    return update(state, {
      [key]: {
        requesting: { $set: false },
        fulfilled: { $set: false },
        pending: { $set: false },
        error: { $set: get(action, 'error') },
        data: { $set: getDefaultData() }
      }
    });
  }

  function defaultReducerSetDefaults(state, action) {
    return update(state, {
      [key]: { $set: get(action, 'payload') }
    });
  }

  function defaultReducerReset(state) {
    return update(state, {
      [key]: { $set: ds }
    });
  }

  const reducer = Reducer({ defaultState: ds, key });
  reducer.addFunction(action.getType('REQUEST'), defaultReducerRequest);
  reducer.addFunction(action.getType('PENDING'), defaultReducerPending);
  reducer.addFunction(action.getType('FULFILLED'), defaultReducerFulfilled);
  reducer.addFunction(action.getType('REJECTED'), defaultReducerRejected);
  reducer.addFunction(action.getType('SET_DEFAULTS'), defaultReducerSetDefaults);
  reducer.addFunction(action.getType('RESET'), defaultReducerReset);

  return reducer;
}

export default DefaultReducer;
