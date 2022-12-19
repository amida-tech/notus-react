const ColorMapping = (allResults, displayData) => {
  const chartColorArray = [
    '#88CCEE',
    '#CC6677',
    '#117733',
    '#332288',
    '#AA4499',
    '#44AA99',
    '#999933',
    '#555555',
    '#661100',
    '#6699CC',
  ];

  const baseColors = []
  const byMeasureColorMap = [];

  const colorBySeed = ((seed, idx) => chartColorArray[idx % 10])

  // CREATES COLOR MAP FOR ALL CURRENT MEASURES
  allResults.forEach((category, idx) => {
    baseColors.push({
      value: category.measure,
      color: colorBySeed(category.measure, idx),
    })
  })

  // HANDLES COMPOSITE VIEW
  if (!displayData || displayData.length === 0) {
    return baseColors
  }
  // HANDLES MEASURE VIEW
  const baseMeasure = displayData[0].measure
  const baseMeasureColor = baseColors.find((mapping) => mapping.value === baseMeasure).color
  byMeasureColorMap.push({
    value: baseMeasure,
    color: baseMeasureColor,
  })
  displayData.slice(0, 1)

  // ADD SUBMEASURES WITH MODIFIED COLOURS
  displayData.forEach((category) => {
    byMeasureColorMap.push({
      value: category.measure,
      color: baseMeasureColor,
    })
  })

  return byMeasureColorMap;
};

export default ColorMapping;
