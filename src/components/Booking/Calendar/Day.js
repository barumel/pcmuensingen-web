import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { get, noop } from 'lodash';
import { FormattedMessage } from 'react-intl';

import './Day.css';

const messageIds = {
  free: 'Booking.Status.Free',
  pending: 'Booking.Status.Pending',
  booked: 'Booking.Status.Booked'
};

const Day = React.memo(({ addBooking, status, day }) => {
  const overlayClassName = cl({
    'calendar-day--overlay': true,
    'calendar-day--booked': status === 'booked',
    'calendar-day--pending': status === 'pending',
    'calendar-day--free': status === 'free'
  });

  return (
    <div
      className="calendar-day"
      onClick={() => addBooking(day)}
    >
      <div className="calendar-day--name">
        <div>{day.format('dddd')}</div>
        <div>{day.format('DD')}</div>
      </div>

      <div className="calendar-day--content">
        <div className={overlayClassName} />
        <div className="calendar-day--number">
          <FormattedMessage id={get(messageIds, status)} />
        </div>
      </div>
    </div>
  );
});

Day.propTypes = {
  addBooking: PropTypes.func,
  status: PropTypes.string,
  day: PropTypes.object.isRequired
};

Day.defaultProps = {
  addBooking: noop,
  status: 'free'
};

export default Day;
