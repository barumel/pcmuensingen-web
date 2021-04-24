import React from 'react';
import PropTypes from 'prop-types';

const BookingDetail = React.memo(({ booking }) => {
  return (
    <div>DETAILLLL</div>
  );
});

BookingDetail.propTypes = {
  booking: PropTypes.object
};

BookingDetail.defaultProps = {
  booking: {}
};

export default BookingDetail;
