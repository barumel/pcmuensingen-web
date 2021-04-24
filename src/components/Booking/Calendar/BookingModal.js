import React from 'react';
import PropTypes from 'prop-types';
import { get, noop, isEmpty } from 'lodash';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import moment from 'moment';

import './BookingModal.css';
import BookingForm from './BookingForm';
import { getValidator } from '../../../globals';

class BookingModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };

    this.onFormValueChange = this.onFormValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFormValueChange(id, value) {
    const { data } = this.state;
    const updated = update(data, { [id]: { $set: value } });

    this.setState({ data: updated });
  }

  onSubmit() {
    const { data } = this.state;
    const {
      createBooking,
      day
    } = this.props;

    createBooking({ ...data, date: day.format() });
  }

  validate() {
    const { data } = this.state;
    const validator = getValidator();

    const definition = {
      validations: {
        firstName: {
          type: 'string',
          required: true
        },
        lastName: {
          type: 'string',
          required: true
        },
        street: {
          type: 'string',
          required: true
        },
        number: {
          type: 'number',
          required: true,
          validations: {
            isInt: []
          }
        },
        zipCode: {
          type: 'number',
          required: true,
          validations: {
            isInt: []
          }
        },
        city: {
          type: 'string',
          required: true
        },
        email: {
          type: 'string',
          required: true,
          validations: {
            isEmail: []
          }
        },
        emailConfirm: {
          type: 'string',
          required: true,
          validations: {
            isEmail: [],
            isSameEmail: [get(data, 'email')]
          }
        }
      }
    };

    return validator.validate(definition, data);
  }

  render() {
    const { data } = this.state;
    const {
      createBooking,
      day,
      isOpen,
      toggle
    } = this.props;

    const validations = this.validate();

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        {isOpen && (
          <>
            <ModalHeader toggle={toggle}>
              <FormattedMessage
                id="Booking.Add.Title"
                values={{ date: `${day.format('dddd')} ${day.format('L')}` }}
                tagName="strong"
              />
            </ModalHeader>

            <ModalBody>
              <BookingForm
                onSubmit={createBooking}
                data={data}
                onChange={this.onFormValueChange}
                validations={validations}
              />
            </ModalBody>

            <ModalFooter>
              <Row style={{ width: '100%' }}>
                <Col lg={12} md={12} sm={12}>
                  <Button
                    color="light-green"
                    className="booking-modal--button"
                    disabled={!isEmpty(validations)}
                    onClick={this.onSubmit}
                  >
                    <FormattedMessage id="Booking.Add.Submit" />
                  </Button>
                </Col>

                <Col lg={12} md={12} sm={12}>
                  <Button
                    color="mdb-color"
                    className="booking-modal--button"
                    onClick={toggle}
                  >
                    <FormattedMessage id="Booking.Add.Cancel" />
                  </Button>
                </Col>
              </Row>
            </ModalFooter>
          </>
        )}
      </Modal>
    );
  }
}

BookingModal.propTypes = {
  createBooking: PropTypes.func,
  day: PropTypes.object,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};

BookingModal.defaultProps = {
  createBooking: noop,
  day: undefined,
  isOpen: false,
  toggle: noop
};

export default BookingModal;
