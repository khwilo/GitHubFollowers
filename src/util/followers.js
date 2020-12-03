import { fetchFollowers } from '../api';

const filter = (list, query) => {
  const result = list.filter(({ login }) => {
    const loginName = login ? login.toLowerCase() : ''.toLowerCase();
    const searchValue = query.toLowerCase();
    return loginName === searchValue;
  });

  return result;
};

const getAll = async (loginName, lastPage) => {
  try {
    const results = [];
    for (let i = 1; i <= lastPage; i += 1) {
      results.push(fetchFollowers(loginName, i));
    }
    return await Promise.all(results);
  } catch (error) {
    console.log('[FETCHING ALL USERS] ERROR: ', error);
  }
  return null;
};

export default { filter, getAll };
