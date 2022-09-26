import tinycolor from 'tinycolor2'

const ColorMapping = (allResults, displayData) => {
  const chartColorArray = [
    '#88CCEE',
    '#CC6677',
    '#DDCC77',
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

  const colorBySeed = ((seed, idx) => chartColorArray[idx % 11])

  const distortColor = (color, idx) => {
    if (idx <= 3) {
      return tinycolor(color).brighten(idx * 15).spin(idx * 10).toString()
    } if (idx <= 6) {
      return tinycolor(color).darken((idx % 3) * 15).spin((idx % 3) * 15).toString()
    } if (idx <= 9) {
      return tinycolor(color).brighten((idx % 3) * 15).spin((idx % 3) * -15).toString()
    } if (idx <= 12) {
      return tinycolor(color).darken((idx % 3) * 15).saturate((idx % 3) * 10).spin((idx % 3) * -15)
        .toString()
    } if (idx <= 15) {
      return tinycolor(color).lighten((idx % 3) * 15).spin((idx % 3) * -25).toString()
    }
    return color
  }

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
  displayData.forEach((category, idx) => {
    byMeasureColorMap.push({
      value: category.measure,
      color: distortColor(baseMeasureColor, idx),
    })
  })

  return byMeasureColorMap;
};

export default ColorMapping;
