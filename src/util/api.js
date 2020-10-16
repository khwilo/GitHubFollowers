const fetchFollowers = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchFollowers;
