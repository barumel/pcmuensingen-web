import React from 'react';
import PropTypes from 'prop-types';
import { get, isUndefined, noop } from 'lodash';
import { Row, Col } from 'reactstrap';

import Game from './Games/Game';
import List from './Games/List';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }

  onAddGame() {

  }

  onAddPlayer() {

  }

  onRemovePlayer() {

  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { current, games, onGameChange } = this.props;

    return (
      <div className="platzginator-games">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <List games={games.filter((game) => ['finished', 'canceled'].includes(get(game, 'status')))} />
          </Col>
        </Row>

        {!isUndefined(current) && (
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Game game={current} onChange={onGameChange} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

Games.propTypes = {
  current: PropTypes.object,
  games: PropTypes.array,
  onGameChange: PropTypes.func
};

Games.defaultProps = {
  current: undefined,
  games: [],
  onGameChange: noop
};

export default Games;
