import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

import './Booking.css';
import Calendar from '../components/Booking/Calendar';

class Booking extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {

    return (
      <div>
        <h1 className="booking--page-title">
          <FormattedMessage id="Booking.PageTitle" />
        </h1>

        <Calendar />
      </div>
    );
  }
}

Booking.propTypes = {

};

Booking.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
