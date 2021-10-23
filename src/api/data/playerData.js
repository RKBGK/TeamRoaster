import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;
// const user = 'rubiblr';
// .get(`${baseURL}/players.json?orderBy="uid"&equalTo="${user}`)
// 'rubiblr' kaur.ruby2020;
//  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}

const getPlayers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/players/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getPlayers().then(resolve));
    })
    .catch(reject);
});

const deletePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/players/${playerObj.firebaseKey}.json`)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

const updatePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
