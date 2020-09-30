import React from 'react';
import PropTypes from 'prop-types';
import { flattenValidationResult } from '@ultritium/validate';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import './ValidationResult.css';

const ValidationResult = React.memo(({ validations }) => {
  const messages = flattenValidationResult(validations);

  const children = messages.map((m) => (
    <div key={get(m, 'key')} className="validation-result--message">
      <FormattedMessage id={get(m, 'message')} tagName="small" />
    </div>
  ));

  return (
    <div className="validation-result">
      {children}
    </div>
  );
});

ValidationResult.propTypes = {
  validations: PropTypes.object
};

ValidationResult.defaultProps = {
  validations: {}
};

export default ValidationResult;
