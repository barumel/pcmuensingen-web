import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';

import './Play.css';
import Platzginator from './Platzginator';

class Play extends React.Component {
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
      <div className="page--play">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <h1 className="play--page-title">
              <FormattedMessage id="Play.PageTitle" />
            </h1>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <p className="play--paragraph">
              <FormattedMessage id="Play.Paragraph1" />
            </p>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <p className="play--paragraph">
              <FormattedMessage id="Play.Paragraph2" />
            </p>
          </Col>
        </Row>

        <Row className="spacer-8" />

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Platzginator />
          </Col>
        </Row>
      </div>
    );
  }
}

Play.propTypes = {

};

Play.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
