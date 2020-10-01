import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import update from 'immutability-helper';
import { Button, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { v4 } from 'uuid';

import Players from '../Players';
import Results from './Results';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.onAddPlayer = this.onAddPlayer.bind(this);
    this.onRemovePlayer = this.onRemovePlayer.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onResume = this.onResume.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onStatusChange(status) {
    const { game, onChange } = this.props;
    const updated = update(game, { status: { $set: status } });

    onChange(updated);
  }

  onStart() {
    const { game, onChange } = this.props;
    const player = get(game, 'players.0.id');
    const rounds = [{
      number: 1
    }];

    const updated = update(game, {
      status: { $set: 'started' },
      results: {
        $push: [{ id: v4(), status: 'pending', player, rounds }]
      }
    });

    onChange(updated);
  }

  onEnd() {
    this.onStatusChange('finished');
  }

  onPause() {
    this.onStatusChange('paused');
  }

  onResume() {
    this.onStatusChange('started');
  }

  onCancel() {
    this.onStatusChange('canceled');
  }

  onAddPlayer(player) {
    const { game, onChange } = this.props;

    const updated = update(game, {
      players: {
        $push: [player]
      }
    });

    onChange(updated);
  }

  onRemovePlayer(player) {
    const { game, onChange } = this.props;
    const index = get(game, 'players', []).findIndex((p) => get(p, 'id') === get(player, 'id'));
    console.log('ON REMOV EPLAYER', player, index, game);
    if (index > -1) {
      const updated = update(game, {
        players: {
          $splice: [[index, 1]]
        }
      });

      onChange(updated);
    }
  }

  getCurrentPlayer() {
    const { game } = this.props;
    const results = get(game, 'results', {});
    const players = get(game, 'players', []);

    const current = results.find((result) => get(result, 'status') === 'pending');

    return players.find((player) => get(player, 'id') === get(current, 'player'));
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { game } = this.props;
    const status = get(game, 'status');

    console.log('GAME STATE', game);

    return (
      <div className="platzginator-games--game">
        <Row>
          <Col lg={12} md={12} sn={12}>
            <h3 style={{ textAlign: 'center' }}>
              <FormattedMessage id="Platzginator.Players.Title" />
            </h3>

            <Players
              players={get(game, 'players', [])}
              onAdd={this.onAddPlayer}
              onRemove={this.onRemovePlayer}
              isGameStarted={get(game, 'status') !== 'added'}
            />
          </Col>
        </Row>

        {['started', 'paused'].includes(status) && (
          <>
            <Row className="spacer-2" />
            <Row>
              <Col lg={12} md={12} sn={12}>
                <Results results={get(game, 'results', [])} game={game} />
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col lg={4} md={2} sm={0} />

          <Col lg={4} md={8} sm={12}>
            {status === 'added' && (
              <Button
                onClick={this.onStart}
                color="light-green"
                className="button-full-width"
                disabled={get(game, 'players.length', 0) === 0}
              >
                <FormattedMessage id="Platzginator.Game.Start" />
              </Button>
            )}

            {status === 'paused' && (
              <Button onClick={this.onResume} color="light-green" className="button-full-width">
                <FormattedMessage id="Platzginator.Game.Resume" />
              </Button>
            )}

            {status === 'started' && (
              <>
                <div>
                  <Button onClick={this.onPause} color="deep-purple" className="button-full-width">
                    <FormattedMessage id="Platzginator.Game.Pause" />
                  </Button>
                </div>

                <div>
                  <Button onClick={this.onCancel} color="deep-orange" className="button-full-width">
                    <FormattedMessage id="Platzginator.Game.Cancel" />
                  </Button>
                </div>
              </>
            )}
          </Col>

          <Col lg={4} md={2} sm={0} />
        </Row>
      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

Game.defaultProps = {
  onChange: noop
};

export default Game;
