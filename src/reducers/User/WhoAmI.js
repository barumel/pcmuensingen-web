import update from 'immutability-helper';
import { get } from 'lodash';

import { DefaultReducer } from '../../packages/redaction/index';
import { whoAmIAction } from '../../actions/User/WhoAmI';
import Acl from '../../packages/acl/Acl';

export const reducer = DefaultReducer({
  action: whoAmIAction,
  key: 'session'
});

function onWhoAmIFulfilled(state, action) {
  const payload = get(action, 'payload');

  return update(state, {
    acl: { $set: Acl({ user: payload, permissions: [] }) },
    session: {
      requesting: { $set: false },
      pending: { $set: false },
      fulfilled: { $set: true },
      error: { $set: false },
      data: { $set: payload }
    }
  });
}

reducer.replaceFunction(
  whoAmIAction.getType('FULFILLED'),
  onWhoAmIFulfilled
);

export default reducer.create();
