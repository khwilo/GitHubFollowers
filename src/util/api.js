// TODO: Paginate network requests

export const fetchFollowers = async (username, page) => {
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
