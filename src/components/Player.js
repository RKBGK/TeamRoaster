import React from 'react';
// import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { deletePlayer, updatePlayer } from '../api/data/playerData';

// NOTES: We want to update this component so that if the todo is complete, the button changes and the edit button is no longer present.
export default function Player({
  player,
  setPlayers,
  setEditPlayer,
  userId,
}) {
  // const history = useHistory();
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player).then(setPlayers);
    } else {
      // history.pushState('/New');
      updatePlayer(player).then(setPlayers);
    }
  };

  return (
    <Card>
      <CardImg top width="20%" height="20%" src={player.imageUrl} alt={player.name} />
      <CardBody>
        <CardTitle tag="h5">{player.name}</CardTitle>
        <CardSubtitle tag="h5">{player.position}</CardSubtitle>
        <CardText visibility="hidden">Hi {userId} this player was entered by: {player.uid} </CardText>
        <div>
          <Button
            onClick={() => setEditPlayer(player)}
            className="btn btn-info"
            type="button"
          >
            EDIT
          </Button>
          <Button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >
            DELETE
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

Player.defaultProps = { setEditPlayer: () => {} };
