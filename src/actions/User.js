import { Actions } from '../packages/redaction/index';

import { whoAmIAction } from './User/WhoAmI';

export const actions = Actions(
  whoAmIAction
);

export default actions.create();
