import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

import './Booking.css';
import Calendar from '../components/Booking/Calendar';
import bookingActions from '../actions/Booking';

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.createBooking = this.createBooking.bind(this);
  }

  createBooking(data) {
    const { bookingActions } = this.props;

    console.log('DEITAAA', data);
    bookingActions.createBookingRequest({ data });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {

    return (
      <div className="page--booking">
        <h1 className="booking--page-title">
          <FormattedMessage id="Booking.PageTitle" />
        </h1>

        <Calendar
          createBooking={this.createBooking}
        />
      </div>
    );
  }
}

Booking.propTypes = {
  bookingActions: PropTypes.object.isRequired
};

Booking.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookingActions: bindActionCreators(bookingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
