import React from 'react';
import PropTypes from 'prop-types';
import Player from '../components/Player';

export default function Team({
  players,
  setPlayers,
  setEditPlayer,
  userId,
}) {
  return (
    <div>
      <h1>Team Players</h1>
      {players.map((player) => (
        <Player
          key={player.firebaseKey}
          player={player}
          setPlayers={setPlayers}
          setEditPlayer={setEditPlayer}
          userId={userId}
        />
      ))}
    </div>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
