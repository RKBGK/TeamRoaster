import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../views/NotFound';
import New from '../views/New';
import Team from '../views/Team';
import Home from '../views/Home';

export default function Routes({ players, setPlayers, userId }) {
  const [editPlayer, setEditPlayer] = useState({});
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/new"
          component={() => (
            <New playerObj={editPlayer} setPlayers={setPlayers} setEditPlayer={setEditPlayer} userId={userId} />
          )}
        />
        <Route
          exact
          path="/team"
          component={() => <Team players={players} setPlayers={setPlayers} setEditPlayer={setEditPlayer} userId={userId} />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

Routes.defaultProps = { userId: {} };
