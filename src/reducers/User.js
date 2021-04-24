import { Reducers } from '../packages/redaction/index';

import {
  whoAmIReducer
} from './User/index';

const reducers = Reducers(
  whoAmIReducer
);

export default reducers.create();
