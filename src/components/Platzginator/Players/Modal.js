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
  Form,
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

  const submit = (ev) => {
    const data = {
      ...player,
      id: get(player, 'id', v4()),
      nickname
    };
    setNickname();
    toggle();
    onSubmit(data);
    ev.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel} autoFocus={false}>
      <Form onSubmit={isUndefined(nickname) ? noop : submit}>
        <ModalBody>
          <FormGroup>
            <Label>
              <FormattedMessage id="Platzginator.Player.Add.Username" />
            </Label>

            <TextInput
              id="nickname"
              value={nickname}
              onChange={(id, value) => setNickname(value)}
              autoFocus
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Row style={{ width: '100%' }}>
            <Col lg={12} md={12} sm={12}>
              <Button
                type="submit"
                color="light-green"
                className="play--players-add-user-modal--button"
                disabled={isUndefined(nickname)}
                onClick={submit}
              >
                <FormattedMessage id="Platzginator.Player.Add.Submit" />
              </Button>
            </Col>

            <Col lg={12} md={12} sm={12}>
              <Button
                color="mdb-color"
                className="play--players-add-user-modal--button"
                onClick={onCancel}
              >
                <FormattedMessage id="General.Button.Cancel" />
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Form>
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
