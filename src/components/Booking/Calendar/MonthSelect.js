import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop } from 'lodash';
import { Button } from 'reactstrap';

import './MonthSelect.css';

const MonthSelect = React.memo(({ min, month, onChange }) => {
  const [selected, select] = useState(month);
  const onClick = useCallback((op) => {
    const updated = selected.clone()[op](1, 'month');
    select(updated);
    onChange(updated);
  }, [selected, onChange]);

  useEffect(() => {
    if (selected.month() < min) {
      const updated = selected.clone().month(min);
      select(updated);
      onChange(updated);
    }
  }, [min]);

  return (
    <div className="month-select">
      <div className="month-select--prev">
        <Button
          color="primary"
          disabled={selected.month() === 0 || selected.month() <= min}
          onClick={() => onClick('subtract')}
        >
          <i className="mdi mdi-chevron-left" />
        </Button>
      </div>

      <div className="month-select--month">
        {selected.format('MMMM')}
      </div>

      <div className="month-select--next">
        <Button
          color="primary"
          disabled={selected.month() === 11}
          onClick={() => onClick('add')}
        >
          <i className="mdi mdi-chevron-right" />
        </Button>
      </div>
    </div>
  );
});

MonthSelect.propTypes = {
  month: PropTypes.object,
  onChange: PropTypes.func,
  min: PropTypes.object
};

MonthSelect.defaultProps = {
  month: moment(),
  onChange: noop,
  min: moment()
};

export default MonthSelect;
