import { DefaultAction } from '../../packages/redaction/index';

export const createAction = DefaultAction('pcm/booking', 'CREATE_BOOKING');

export default createAction.create();
