import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';
import { noop } from 'lodash';

import './YearSelect.css';

const YearSelect = React.memo(({ year, onChange, min, max }) => {
  const [selected, select] = useState(year);
  const onClick = useCallback((value) => {
    select(value);
    onChange(value);
  }, []);

  return (
    <div className="year-select">
      <div className="year-select--prev">
        <Button
          color="primary"
          disabled={selected === min}
          onClick={() => onClick(selected - 1)}
        >
          <i className="mdi mdi-chevron-left" />
        </Button>
      </div>

      <div className="year-select--year">
        {selected}
      </div>

      <div className="year-select--next">
        <Button
          color="primary"
          disabled={selected === max}
          onClick={() => onClick(selected + 1)}
        >
          <i className="mdi mdi-chevron-right" />
        </Button>
      </div>
    </div>
  );
});

YearSelect.propTypes = {
  year: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

YearSelect.defaultProps = {
  year: moment().year(),
  onChange: noop,
  min: moment().year(),
  max: moment().year() + 2
};

export default YearSelect;
