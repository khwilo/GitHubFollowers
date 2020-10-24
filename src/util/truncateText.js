const ending = '...';
const length = 12;

const truncateText = (str) => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

export default truncateText;
