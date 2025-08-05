import axios from 'axios';

const TOKEN = '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';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${TOKEN}`,
  },
});

const searchUsers = async (query) => {
  const response = await githubAPI.get('/search/users', {
    params: { q: query }
  });
  return response.data;
};

const getUserDetails = async (username) => {
  const response = await githubAPI.get(`/users/${username}`);
  return response.data;
};

export default {
  searchUsers,
  getUserDetails,
};
