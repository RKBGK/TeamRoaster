import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../api/data/playerData';

// Create an initial state object so that it can be reused in the component
const initialState = {
  name: '',
  position: '',
  uid: '',
  imageUrl: '',
};
export default function PlayerForm({
  playerObj,
  setPlayers,
  setEditPlayer,
  userId,
}) {
  // set the default state to the initialState object
  const [formInput, setFormInput] = useState(initialState);

  // when the component mounts, check if a firebasekey exists. If it does, set the value of formInput to the obj values
  useEffect(() => {
    let isMounted = true;
    if (playerObj.firebaseKey) {
      if (isMounted) {
        setFormInput({
          name: playerObj.name,
          firebaseKey: playerObj.firebaseKey,
          position: playerObj.position,
          imageUrl: playerObj.imageUrl,
          uid: playerObj.uid,
        });
      }
    }
    return () => {
      isMounted = false;
    };
    // rerender the component if the obj value is different
  }, [playerObj]);

  // On call of the resetForm function, reset the state to the initialState
  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditPlayer({});
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Since we are using this form for both creating and updating, we need to use logic to determine which method to run. If there is a firebaseKey, we know that we are updating.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerObj.firebaseKey) {
      // update the todo
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
      });
    } else {
      createPlayer({ ...formInput, uid: userId }).then((players) => {
        setPlayers(players);
        resetForm();
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <label htmlFor="name" className="form-label visually-hidden">
            Name
          </label>
          <input
            className="form-control form-control-lg me-1"
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="Enter Player Name!"
            required
          />
          <label htmlFor="imageURL" className="form-label visually-hidden">
            ImageURL
          </label>
          <input
            className="form-control form-control-lg me-1"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            placeholder="Enter Image URL!"
            required
          />
          <select
            className="form-select form-select-lg me-1"
            aria-label="position"
            name="position"
            value={formInput.position}
            onChange={handleChange}
            required
          >
            <option value="">Position</option>
            <option value="Bowler">Bowler</option>
            <option value="Batsman">Batsman</option>
            <option value="WicketKeeper">WicketKeeper</option>
            <option value="Fielder">Fielder</option>
          </select>
          <button className="btn btn-success" type="submit">
            {playerObj.firebaseKey ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

PlayerForm.propTypes = {
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

PlayerForm.defaultProps = {
  playerObj: {},
  userId: {},
};
