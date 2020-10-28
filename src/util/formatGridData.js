const formatGridData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      key: `blank-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow += 1;
  }

  return data;
};

export default formatGridData;
