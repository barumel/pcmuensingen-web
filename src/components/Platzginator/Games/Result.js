import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import { Row, Col, FormGroup } from 'reactstrap';

import './Result.css';
import NumberInput from '../../Form/NumberInput';

const Item = React.memo(({ value, editable, onChange }) => {
  const [edit, setEdit] = useState(false);
console.log('EDIT', edit);
  const toggleEdit = editable
    ? () => setEdit(!edit)
    : noop;

  return (
    <div className="platzginator-game-result--result--item">
      {edit && (
        <>
          <FormGroup>
            <NumberInput
              id="foo"
              value={value}
              onChange={() => onChange(value)}
            />
          </FormGroup>
        </>
      )}

      {!edit && (
        <div className="platzginator-game-result--result--item-value" onClick={toggleEdit}>
          {value}
        </div>
      )}
    </div>
  );
});

Item.propTypes = {
  value: PropTypes.number,
  editable: PropTypes.bool,
  onChange: PropTypes.func
};

Item.defaultProps = {
  value: undefined,
  editable: true,
  onChange: noop
};

const Round = React.memo(({ round }) => {
  const total = get(round, '1', 0) + get(round, '2', 0) + get(round, '3', 0);

  return (
    <Row className="platzginator-game-result--result--round">
      <Col lg={2} md={2} sm={0} />

      <Col lg={2} md={2} sm={12}>
        <Item value={get(round, '1')} />
        sdf
      </Col>

      <Col lg={2} md={2} sm={12}>
        <Item value={get(round, '2')} />
      </Col>

      <Col lg={2} md={2} sm={12}>
        <Item value={get(round, '3')} />
      </Col>

      <Col lg={2} md={2} sm={12} className="platzginator-game-scoregroup--total">
        {total}
      </Col>

      <Col lg={2} md={2} sm={0} />
    </Row>
  );
});

Round.propTypes = {
  round: PropTypes.object.isRequired
};

Round.defaultProps = {

};

const Result = React.memo(({ result }) => {
  const children = get(result, 'rounds', [])
    .map((round) => (
      <Round round={round} />
    ));

  return (
    <div className="platzginator-game-result--result">
      {children}
    </div>
  );
});

Result.propTypes = {
  result: PropTypes.object.isRequired
};

Result.defaultProps = {

};

export default Result;
