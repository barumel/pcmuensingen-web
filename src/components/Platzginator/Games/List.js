import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { get, noop } from 'lodash';

import './List.css';

const GameList = React.memo(({ games, onRemove }) => {
  const remove = (ev, player) => {
    ev.preventDefault();
    ev.stopPropagation();
    onRemove(player);
  };

  const children = games.map((game) => (
    <ListGroupItem key={get(game, 'id')}>
      <div className="play--players--player-item">
        <div className="play--players--player-item--info">
          {get(game, 'nickname')}
        </div>

        <div className="play--players--player-item--remove" onClick={(ev) => remove(ev, game)}>
          <i className="mdi mdi-trash-can-outline" />
        </div>
      </div>
    </ListGroupItem>
  ));

  return (
    <>
      <ListGroup>
        {children}
      </ListGroup>
    </>
  );
});

GameList.propTypes = {
  games: PropTypes.array,
  onRemove: PropTypes.func
};

GameList.defaultProps = {
  games: [],
  onRemove: noop
};

export default GameList;
