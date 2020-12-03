export const fetchFollowers = async (username, page = 1) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers?page=${page}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getLastPage = async (loginName) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${loginName}/followers`,
    );
    const { headers } = response;
    const endOfList = headers.get('link')
      ? headers
          .get('link')
          .split(',')[1]
          .split(';')[0]
          .split('?')[1]
          .substring(5)
          .slice(0, -1)
      : 1;
    return endOfList;
  } catch (error) {
    console.log('ERROR FETCHING LAST PAGE: ', error);
    throw error;
  }
};
