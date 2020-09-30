import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get, isUndefined, noop } from 'lodash';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Label,
  FormGroup
} from 'reactstrap';
import { v4 } from 'uuid';

import './Modal.css';
import TextInput from '../../Form/TextInput';

const PlayerModal = React.memo(({
  isOpen,
  toggle,
  player,
  onSubmit
}) => {
  const [nickname, setNickname] = useState(get(player, 'nickname'));

  const onCancel = () => {
    setNickname();
    toggle();
  };

  const submit = () => {
    const data = {
      ...player,
      id: get(player, 'id', v4()),
      nickname
    };
    setNickname();
    toggle();
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalBody>
        <FormGroup>
          <Label>
            <FormattedMessage id="Play.User.Add.Username" />
          </Label>

          <TextInput
            id="username"
            value={nickname}
            onChange={(id, value) => setNickname(value)}
          />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Row style={{ width: '100%' }}>
          <Col lg={12} md={12} sm={12}>
            <Button
              color="light-green"
              className="play--players-add-user-modal--button"
              disabled={isUndefined(nickname)}
              onClick={submit}
            >
              <FormattedMessage id="Play.User.Add.Submit" />
            </Button>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <Button
              color="mdb-color"
              className="play--players-add-user-modal--button"
              onClick={onCancel}
            >
              <FormattedMessage id="Play.User.Add.Cancel" />
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
});

PlayerModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
  player: PropTypes.object
};

PlayerModal.defaultProps = {
  isOpen: false,
  toggle: noop,
  onSubmit: noop,
  player: {}
};

export default PlayerModal;
