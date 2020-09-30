import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import { TextInput, NumberInput, ValidationResult } from '../../Form/index';

const BookingForm = React.memo(({
  data,
  onChange,
  validations
}) => {
  return (
    <div className="booking-form">
      <FormGroup>
        <Label>
          <FormattedMessage id="Booking.Form.FirstName" tagName="strong" />
        </Label>

        <TextInput
          id="firstName"
          value={get(data, 'firstName', '')}
          onChange={onChange}
        />

        <ValidationResult validations={get(validations, 'firstName')} />
      </FormGroup>

      <FormGroup>
        <Label>
          <FormattedMessage id="Booking.Form.LastName" tagName="strong" />
        </Label>

        <TextInput
          id="lastName"
          value={get(data, 'lastName', '')}
          onChange={onChange}
        />

        <ValidationResult validations={get(validations, 'lastName')} />
      </FormGroup>

      <Row form>
        <Col lg={10} md={8} sm={12}>
          <FormGroup>
            <Label>
              <FormattedMessage id="Booking.Form.Street" tagName="strong" />
            </Label>

            <TextInput
              id="street"
              value={get(data, 'street', '')}
              onChange={onChange}
            />

            <ValidationResult validations={get(validations, 'street')} />
          </FormGroup>
        </Col>

        <Col lg={2} md={4} sm={12}>
          <FormGroup>
            <Label>
              <FormattedMessage id="Booking.Form.Number" tagName="strong" />
            </Label>

            <NumberInput
              id="number"
              value={get(data, 'number')}
              onChange={onChange}
            />

            <ValidationResult validations={get(validations, 'number')} />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col lg={2} md={4} sm={12}>
          <FormGroup>
            <Label>
              <FormattedMessage id="Booking.Form.ZipCode" tagName="strong" />
            </Label>

            <NumberInput
              id="zipCode"
              value={get(data, 'zipCode')}
              onChange={onChange}
            />

            <ValidationResult validations={get(validations, 'zipCode')} />
          </FormGroup>
        </Col>

        <Col lg={10} md={8} sm={12}>
          <FormGroup>
            <Label>
              <FormattedMessage id="Booking.Form.City" tagName="strong" />
            </Label>

            <TextInput
              id="city"
              value={get(data, 'city', '')}
              onChange={onChange}
            />

            <ValidationResult validations={get(validations, 'city')} />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label>
          <FormattedMessage id="Booking.Form.Email" tagName="strong" />
        </Label>

        <TextInput
          id="email"
          type="email"
          value={get(data, 'email', '')}
          onChange={onChange}
        />

        <ValidationResult validations={get(validations, 'email')} />
      </FormGroup>

      <FormGroup>
        <Label>
          <FormattedMessage id="Booking.Form.EmailConfirm" tagName="strong" />
        </Label>

        <TextInput
          id="emailConfirm"
          type="email"
          value={get(data, 'emailConfirm', '')}
          onChange={onChange}
        />

        <ValidationResult validations={get(validations, 'emailConfirm')} />
      </FormGroup>
    </div>
  );
});

BookingForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  validations: PropTypes.object
};

BookingForm.defaultProps = {
  data: {},
  onChange: noop,
  validations: {}
};

export default BookingForm;
