import { DefaultAction } from '../../packages/redaction/index';

export const createAction = DefaultAction('pcm/booking', 'CREATE');

export default createAction.create();
