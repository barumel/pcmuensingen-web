import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { get, noop } from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import './Day.css';

const messageIds = {
  free: 'Booking.Status.Free',
  pending: 'Booking.Status.Pending',
  booked: 'Booking.Status.Booked'
};

const Day = React.memo(({
  addBooking,
  status,
  showDetail,
  day
}) => {
  const disabled = day.startOf('day').isBefore(moment().startOf('day')) || status !== 'free';

  const overlayClassName = cl({
    'calendar-day--overlay': true,
    'calendar-day--overlay-disabled': disabled,
    'calendar-day--booked': status === 'booked',
    'calendar-day--pending': status === 'pending',
    'calendar-day--free': status === 'free'
  });

  const onClick = disabled
    ? noop
    : status === 'free'
      ? () => addBooking(day)
      // Add acl check
      : showDetail;

  return (
    <div
      className="calendar-day"
      onClick={onClick}
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
  day: PropTypes.object.isRequired,
  showDetail: PropTypes.func
};

Day.defaultProps = {
  addBooking: noop,
  status: 'free',
  showDetail: noop
};

export default Day;
