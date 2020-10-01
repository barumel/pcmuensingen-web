import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { get, noop } from 'lodash';

const TextInput = React.memo(({
  autoFocus,
  id,
  type,
  onChange,
  value
}) => {
  const handleChange = useCallback((ev) => {
    let updated = get(ev, 'target.value', '');
    if (get(updated.trim(), 'length', 0) === 0) updated = undefined;

    onChange(id, updated, ev);
  }, [])

  return (
    <>
      <Input
        id={id}
        type={type}
        value={value || ''}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </>
  );
});

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool
};

TextInput.defaultProps = {
  value: undefined,
  type: 'text',
  onChange: noop,
  autoFocus: false
};

export default TextInput;
