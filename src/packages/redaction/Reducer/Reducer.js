import { set, defaults } from 'lodash';

function Reducer({
  defaultState,
  key
}) {
  const functions = {};
  const ds = {
    [key]: defaults(
      {},
      defaultState,
      {
        requesting: false,
        pending: false,
        fulfilled: false,
        error: false
      }
    )
  };

  function redactionNoopReducer(state) {
    return state;
  }

  function addFunction(type, func = redactionNoopReducer) {
    set(functions, type, func);
  }

  function getDefaultState() {
    return ds;
  }

  function getFunctions() {
    return functions;
  }

  function create() {
    return (state = ds, action = {}) => {
      const func = functions[action.type] || functions.default || redactionNoopReducer;
      return func(state, action);
    };
  }

  return Object.freeze({
    create,
    addFunction,
    getDefaultState,
    getFunctions
  });
}

export default Reducer;
