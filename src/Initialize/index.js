import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import SignIn from '../views/SignIn';
import Navigation from '../components/Navigation';
// import PlayerForm from '../components/PlayerForm';
import Routes from '../routes';
import { getPlayers } from '../api/data/playerData';

function Initialize() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  // const [editPlayer, setEditPlayer] = useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        // something to happen
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getPlayers(userInfoObj.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Navigation />
          <h1> Hi {user.user}</h1>
          {/* <PlayerForm
            playerObj={editPlayer}
            setPlayers={setPlayers}
            setEditPlayer={setEditPlayer}
            userId={user.user}
          /> */}
          <Routes players={players} setPlayers={setPlayers} userId={user.uid} />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </div>
  );
}

export default Initialize;
