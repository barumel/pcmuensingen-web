import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import update from 'immutability-helper';

import './Platzginator.css';
import Players from '../components/Platzginator/Players';

class Platzginator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addPlayer(player) {
    const { players } = this.state;

    const updated = update(players, { $push: [player] });

    this.setState({ players: updated });
  }

  removePlayer(player) {
    const { players } = this.state;

    const index = players.findIndex((p) => get(p, 'id') === get(player, 'id'));

    if (index > -1) {
      const updated = update(players, { $splice: [[index, 1]] });
      this.setState({ players: updated });
    }
  }

  start() {

  }

  end() {

  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { players } = this.state;

    return (
      <div className="platzginator">
        <Players
          players={players}
          onAdd={this.addPlayer}
          onRemove={this.removePlayer}
        />
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
