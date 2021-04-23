import { has, set, reduce, isUndefined } from 'lodash';

function DefaultFunction(type) {
  return function redactionDefaultAction(props) {
    return { type, ...props };
  };
}

function Action({
  context,
  prefix
}) {
  const functions = {};

  function getType(key) {
    return `redaction/${context}/${prefix.toUpperCase()}_${key.toUpperCase()}`;
  }

  function setFunction(key, func) {
    const f = isUndefined(func)
      ? DefaultFunction(getType(key))
      : func;

    set(functions, key, f);
  }

  function addFunction(key, func) {
    if (has(functions, key)) {
      throw new Error(`Function with key ${key} already registered!`);
    }

    setFunction(key, func);
  }

  function replaceFunction(key, func) {
    setFunction(key, func);
  }

  function removeFunction(key) {
    delete functions[key];
  }

  function getContext() {
    return context;
  }

  function getPrefix() {
    return prefix;
  }

  function create() {
    return reduce(functions, (result, func, key) => {
      set(result, key, func);

      return result;
    }, {});
  }

  function getFunctions() {
    return functions;
  }

  return Object.freeze({
    addFunction,
    replaceFunction,
    removeFunction,
    create,
    getContext,
    getPrefix,
    getType,
    getFunctions
  });
}

export default Action;
