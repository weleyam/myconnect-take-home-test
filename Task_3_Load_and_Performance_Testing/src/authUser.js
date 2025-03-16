import http from 'k6/http';
import { sleep, check } from 'k6';
import { SharedArray } from 'k6/data';

// load users data from JSON file
const users = new SharedArray('users', function () {
  return JSON.parse(open('./data/list_user.json')).users;
});

// to get random user from the list
function getRandomUser() {
  return users[Math.floor(Math.random() * users.length)];
}

export const options = {
  vus: 50, // 50 users
  duration: '30s',// 30 seconds
};

export default function () {
  // get random user
  const user = getRandomUser();

  const url = 'https://dummyjson.com/auth/login';
  const headers = {
    'Content-Type': 'application/json',
  };

  // set request body
  const payload = JSON.stringify({
    username: user.username,
    password: user.password
  });

  const res = http.post(url, payload, { headers });

  // validate respons
  check(res, {
    'is status 200': (r) => r.status === 200,
    'has accessToken': (r) => JSON.parse(r.body).hasOwnProperty('accessToken'),
  });

}
