import { DefaultReducer } from '../../packages/redaction/index';
import { createAction } from '../../actions/Booking/Create';

export const reducer = DefaultReducer({
  action: createAction,
  key: 'create'
});

export default reducer.create();
