import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import BookingDetail from './BookingDetail';

class BookingDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.onApprove = this.onApprove.bind(this);
    this.onReject = this.onReject.bind(this);
  }

  onApprove() {

  }

  onReject() {}

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const {
      booking,
      isOpen,
      toggle
    } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <FormattedMessage
            id="Booking.Detail.Title"
            values={{ date: moment(get(booking, 'date')).format('L') }}
            tagName="strong"
          />
        </ModalHeader>

        <ModalBody>
          <BookingDetail booking={booking} />
        </ModalBody>

        <ModalFooter>

        </ModalFooter>
      </Modal>
    );
  }
}

BookingDetailModal.propTypes = {
  booking: PropTypes.object,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};

BookingDetailModal.defaultProps = {
  booking: {},
  isOpen: false,
  toggle: noop
};

export default BookingDetailModal;
