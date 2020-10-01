import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-number-format';
import { get, noop } from 'lodash';
import cl from 'classnames';

const NumberInput = React.memo(({
  autoFocus,
  className,
  id,
  value,
  onChange
}) => {
  const handleChange = useCallback((values) => {
    onChange(id, get(values, 'floatValue'), values);
  }, []);

  return (
    <>
      <Input
        id="id"
        value={value}
        onValueChange={handleChange}
        className={cl('form-control', className)}
        autoFocus={autoFocus}
      />
    </>
  );
});

NumberInput.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};

NumberInput.defaultProps = {
  autoFocus: false,
  value: undefined,
  onChange: noop,
  className: undefined
};

export default NumberInput;
