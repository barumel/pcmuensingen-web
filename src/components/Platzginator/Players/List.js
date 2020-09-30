import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { get, noop } from 'lodash';

import './List.css';
import Modal from './Modal';

const PlayerList = React.memo(({ players, onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [editPlayer, setEditPlayer] = useState();

  const toggleModal = (player) => {
    setEditPlayer(player);
    setShowModal(!showModal);
  };

  const remove = (ev, player) => {
    ev.preventDefault();
    ev.stopPropagation();
    onRemove(player);
  };

  const children = players.map((player) => (
    <ListGroupItem key={get(player, 'id')} onClick={() => toggleModal(player)}>
      <div className="play--players--player-item">
        <div className="play--players--player-item--info">
          {get(player, 'nickname')}
        </div>

        <div className="play--players--player-item--remove" onClick={(ev) => remove(ev, player)}>
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

      <Modal
        key={get(editPlayer, 'id')}
        isOpen={showModal}
        toggle={toggleModal}
        player={editPlayer}
      />
    </>
  );
});

PlayerList.propTypes = {
  players: PropTypes.array,
  onRemove: PropTypes.func
};

PlayerList.defaultProps = {
  players: [],
  onRemove: noop
};

export default PlayerList;
