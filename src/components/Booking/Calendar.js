import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { Row, Col } from 'reactstrap';

import { Day, MonthSelect, YearSelect, BookingModal } from './Calendar/index';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      year: moment().year(),
      showModal: false,
      day: undefined
    };

    this.addBooking = this.addBooking.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onYearChange(year) {
    const { month } = this.state;
    this.setState({ year, month: month.clone().year(year) });
  }

  onMonthChange(month) {
    this.setState({ month });
  }

  addBooking(day) {
    this.setState({ day, showModal: true });
  }

  hideModal() {
    this.setState({ day: undefined, showModal: false });
  }

  renderDays() {
    const { month, year } = this.state;
    const r = extendMoment(moment);
    const m = moment().year(year).month(month.month());

    const range = r().range(moment(m).startOf('month'), moment(m).endOf('month'));
    const days = range.by('days');

    return [...days].map((day) => (
      <Col key={day} lg={2} md={2} sm={12}>
        <Day
          addBooking={this.addBooking}
          day={day}
        />
      </Col>
    ));
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const {
      day,
      month,
      year,
      showModal
    } = this.state;
    const { createBooking } = this.props;

    const now = moment();

    return (
      <>
        <Row>
          <Col lg={2} md={1} sm={0} />

          <Col lg={4} md={5} sm={12}>
            <YearSelect year={year} onChange={this.onYearChange} />
          </Col>

          <Col lg={4} md={5} sm={12}>
            <MonthSelect month={month} onChange={this.onMonthChange} min={now.year() === year ? now.month() : 0} />
          </Col>

          <Col lg={2} md={1} sm={0} />
        </Row>

        <Row>
          {this.renderDays()}
        </Row>

        <BookingModal
          createBooking={createBooking}
          isOpen={showModal}
          day={day}
          toggle={this.hideModal}
        />
      </>
    );
  }
}

Calendar.propTypes = {
  bookings: PropTypes.object,
  createBooking: PropTypes.func
};

Calendar.defaultProps = {
  bookings: {},
  createBooking: noop
};

export default Calendar;
