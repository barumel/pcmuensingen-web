import { get, mergeWith, isUndefined, isBoolean } from 'lodash';

function buildTree(roles = ['EVERYONE'], permissions = []) {
  let tree = {};
  roles.forEach((role) => {
    const foo = permissions.find((p) => get(p, 'role') === role);
    if (isUndefined(foo)) return;

    tree = mergeWith(tree, role.permissions, (objValue, srcValue) => {
      if (isBoolean(objValue) && objValue === true) return true;
      if (isBoolean(srcValue) && srcValue === true) return true;

      return undefined;
    });
  });
}

function Acl({
  user,
  permissions
}) {
  let tree = buildTree(get(user, 'roles'), permissions);

  function isAllowed(path) {
    return get(tree, path, false);
  }

  function hasRole(role) {
    return get(user, 'roles', []).includes(role);
  }

  function setTemporaryRoles(roles) {
    tree = buildTree(roles, permissions);
  }

  function reset() {
    tree = buildTree(get(user, 'roles'), permissions);
  }

  return Object.freeze({
    isAllowed,
    hasRole,
    setTemporaryRoles,
    reset
  });
}

export default Acl;
