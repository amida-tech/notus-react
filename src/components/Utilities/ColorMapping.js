const ColorMapping = (colorMapping, chartColorArray, displayData) => {
  const measureList = [];
  // Get base measure and filter out the mapped color
  const baseMeasure = displayData[0].measure;
  const filteredColorArray = chartColorArray.filter(
    (color) => color !== colorMapping.find((mapping) => mapping.value === baseMeasure).color,
  );

  // Create list of measures from subscores (if needed)
  if (displayData[0].subScores && displayData[0].subScores.length > 1) {
    displayData[0].subScores.forEach((subScore) => measureList.push(subScore.measure));
  }

  // Generate colormap for subscores
  const byMeasureColorMap = measureList.map((item, index) => ({
    value: item,
    color: index <= 10 ? filteredColorArray[index] : filteredColorArray[index % 10],
  }));

  // Add in base measure and it's originally mapped color
  measureList.unshift(baseMeasure);
  byMeasureColorMap.unshift({
    value: baseMeasure,
    color: colorMapping.find((mapping) => mapping.value === baseMeasure).color,
  });

  return byMeasureColorMap;
};

export default ColorMapping;