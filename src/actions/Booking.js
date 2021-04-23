import { Actions } from '../packages/redaction/index';

import { createAction } from './Booking/Create';

export const actions = Actions(createAction);

export default actions.create();
