import { defaultsDeep, merge } from 'lodash';

function Reducers(...reducers) {
  function combine(defaultState, ...reducers) {
    return (state = defaultState, action) => reducers.reduce((result, reducer) => reducer(result, action), state);
  }

  function mergeDefaultStates(...states) {
    return states.reduce((result, state) => {
      result = defaultsDeep(result, state);
      return result;
    }, {});
  }

  const defaultState = mergeDefaultStates(...reducers.map((r) => r.getDefaultState()));
  const functions = reducers.reduce((result, reducer) => {
    result = merge(result, reducer.getFunctions());
    return result;
  }, {});

  function create() {
    return combine(
      defaultState,
      ...reducers.map((r) => r.create())
    );
  }

  return Object.freeze({
    create
  });
}

export default Reducers;
