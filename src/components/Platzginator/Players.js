import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isUndefined, noop } from 'lodash';
import { Button, Row, Col } from 'reactstrap';

import './Players.css';
import List from './Players/List';
import Modal from './Players/Modal';

const Players = React.memo(({ onAdd, onRemove, players }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="platzginator-users">
      <Row>
        <Col lg={2} md={1} sm={0} />

        <Col lg={8} md={10} sm={12}>
          <List players={players} onRemove={onRemove} />
        </Col>

        <Col lg={2} md={1} sm={0} />
      </Row>

      <Row>
        <Col lg={4} md={2} sm={0} />

        <Col lg={4} md={8} sm={12}>
          <Button
            color="light-green"
            className="play--players-add--button"
            onClick={toggleModal}
          >
            <FormattedMessage id="Play.User.Add.New" />
          </Button>
        </Col>

        <Col lg={4} md={2} sm={0} />
      </Row>

      <Modal
        isOpen={showModal}
        toggle={toggleModal}
        onSubmit={onAdd}
      />
    </div>
  );
});

Players.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  players: PropTypes.array
};

Players.defaultProps = {
  onAdd: noop,
  onRemove: noop,
  players: []
};

export default Players;
