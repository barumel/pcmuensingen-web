import { set, map, camelCase, upperFirst } from 'lodash';

function Actions(...actions) {
  const functions = actions.reduce((result, action, key) => {
    const af = action.getFunctions();
    map(af, (func, key) => {
      const k = `${camelCase(action.getPrefix())}${upperFirst(key.toLowerCase())}`;
      set(result, k, func);
    });

    return result;
  }, {});

  function create() {
    return functions;
  }

  return Object.freeze({
    create
  });
}

export default Actions;
