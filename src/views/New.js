import React from 'react';
import PropTypes from 'prop-types';
import PlayerForm from '../components/PlayerForm';

export default function New({
  playerObj,
  setPlayers,
  setEditPlayer,
  userId,
}) {
  return (
    <div>
      <PlayerForm
        playerObj={playerObj}
        setPlayers={setPlayers}
        setEditPlayer={setEditPlayer}
        userId={userId}
      />
    </div>
  );
}

New.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

New.defaultProps = { playerObj: {}, userId: {} };
