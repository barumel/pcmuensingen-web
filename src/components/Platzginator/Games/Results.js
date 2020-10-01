import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import update from 'immutability-helper';
import { ListGroup, ListGroupItem, UncontrolledCollapse, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import Result from './Result';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.onResultChange = this.onResultChange.bind(this);
  }

  onResultChange(result) {
    const { results, onChange } = this.props;

    const index = results.findIndex((r) => get(r, 'player') === get(result, 'player'));

    if (index > -1) {
      const updated = update(results, {
        $splice: [[index, 1, result]]
      });

      onChange(updated);
    }
  }

  getCurrentResult() {
    const { results } = this.props;

    return results.find((result) => get(result, 'status') === 'pending');
  }

  renderFinishedResults() {
    const { results } = this.props;

    const children = results.filter((result) => get(result, 'status') === 'finished')
      .map((result) => (
        <ListGroupItem id={get(result, 'id')} key={get(result, 'id')}>
          <strong>
            {get(result, 'total')}
          </strong>

          <UncontrolledCollapse toggler={`#${get(result, 'id')}`}>
            <Result result={result} />
          </UncontrolledCollapse>
        </ListGroupItem>
      ));

    return (
      <ListGroup>
        {children}
      </ListGroup>
    );
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="platzginator-game-results">
        <Row>
          <h4 style={{ textAlign: 'center', width: '100%' }}>
            <FormattedMessage id="Platzginator.Results.Title" />
          </h4>

          <Col lg={12} md={12} sm={12}>
            {this.renderFinishedResults()}
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Result result={this.getCurrentResult()} />
          </Col>
        </Row>
      </div>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array,
  game: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

Results.defaultProps = {
  results: [],
  onChange: noop
};

export default Results;
