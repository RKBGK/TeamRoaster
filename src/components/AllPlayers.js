import React from 'react';
import PropTypes from 'prop-types';
import { deletePlayer, updatePlayer } from '../api/data/playerData';

export default function AllPlayers({ allPlayer, setPlayers }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(allPlayer.firebaseKey).then(setPlayers);
    } else {
    // update
      updatePlayer({ allPlayer }).then(setPlayers);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-between alert alert-light"
        role="alert"
      >
        <button
          onClick={() => setPlayers(allPlayer)}
          className="btn btn-info"
          type="button"
        >
          Edit
        </button>
        {allPlayer.name}
        {allPlayer.position}
        {allPlayer.firebaseKey}
        {allPlayer.uid}
        {allPlayer.imageUrl}

        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </div>
    </>
  );
}

AllPlayers.propTypes = {
  allPlayer: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
};
