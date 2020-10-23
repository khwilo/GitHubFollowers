const ending = '...';
const length = 10;

const truncateText = (str) => {
  if (str.length > 10) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

export default truncateText;
