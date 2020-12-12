const formatGridData = (data, numColumns) => {
  let list = data;
  if (!Array.isArray(data)) {
    list = [];
    return list;
  }

  const numberOfFullRows = Math.floor(list.length / numColumns);

  let numberOfElementsLastRow = list.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    list.push({
      key: `blank-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow += 1;
  }

  return list;
};

export default formatGridData;
