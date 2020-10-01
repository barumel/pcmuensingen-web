import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const ScoreGroup = React.memo(({  }) => {
  return (
    <Row className="platzginator-game-scoregroup">
      <Col lg={3} sm={3} sm={12}>
        12
      </Col>

      <Col lg={3} sm={3} sm={12}>
        12
      </Col>

      <Col lg={3} sm={3} sm={12}>
        12
      </Col>

      <Col lg={3} sm={3} sm={12} className="platzginator-game-scoregroup--total">
        120
      </Col>
    </Row>
  );
});

ScoreGroup.propTypes = {

};

ScoreGroup.defaultProps = {

};

export default ScoreGroup;
