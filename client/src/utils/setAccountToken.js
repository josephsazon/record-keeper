import axios from 'axios';

const setAccountToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-account-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-account-token'];
  }
};

export default setAccountToken;
