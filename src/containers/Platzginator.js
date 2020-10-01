import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, isUndefined } from 'lodash';
import update from 'immutability-helper';
import { Button, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { v4 } from 'uuid';

import './Platzginator.css';
import Games from '../components/Platzginator/Games';

class Platzginator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };

    this.addGame = this.addGame.bind(this);
    this.onGameChange = this.onGameChange.bind(this);
  }

  onGameChange(game) {
    const { games } = this.state;
    const index = games.findIndex((g) => get(g, 'id') === game.id);

    const updated = update(games, {
      $splice: [[index, 1, game]]
    });

    this.setState({ games: updated });
  }

  getCurrentGame() {
    const { games } = this.state;

    return games.find((g) => ['added', 'started', 'paused'].includes(get(g, 'status')));
  }

  addGame() {
    const { games } = this.state;

    const game = {
      id: v4(),
      status: 'added',
      players: [],
      results: []
    };

    const updated = update(games, { $push: [game] });

    this.setState({ games: updated });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { games } = this.state;
    const current = this.getCurrentGame();

    return (
      <div className="platzginator">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Games
              games={games}
              current={current}
              onGameChange={this.onGameChange}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={2} sm={0} />

          <Col lg={4} md={8} sm={12}>
            {isUndefined(current) && (
              <Button onClick={this.addGame} color="light-green" className="button-full-width">
                <FormattedMessage id="Platzginator.Game.Add" />
              </Button>
            )}
          </Col>

          <Col lg={4} md={2} sm={0} />
        </Row>
      </div>
    );
  }
}

Platzginator.propTypes = {

};

Platzginator.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Platzginator);
