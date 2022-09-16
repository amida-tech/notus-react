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
    '#888888',
    '#661100',
    '#6699CC',
    // REPEATING BELOW
    '#88CCEE',
    '#CC6677',
    '#DDCC77',
    '#117733',
    '#332288',
    '#AA4499',
    '#44AA99',
    '#999933',
    '#888888',
    '#661100',
    '#6699CC',
    '#88CCEE',
    '#CC6677',
    '#DDCC77',
    '#117733',
  ];

  const baseColors = []
  const byMeasureColorMap = [];

  const colorBySeed = (seed) => chartColorArray.pop(seed.split('').length, 1)

  const distortColor = (color, idx) => {
    if (idx <= 3) {
      return tinycolor(color).brighten(idx * 15).spin(idx * 10).toString()
    } else if (idx <= 6) {
      return tinycolor(color).darken((idx % 3) * 15).spin((idx % 3) * 15).toString()
    } else if (idx <= 9) {
      return tinycolor(color).brighten((idx % 3) * 15).spin((idx % 3) * -15).toString()
    } else if (idx <= 12) {
      return tinycolor(color).darken((idx % 3) * 15).saturate((idx % 3) * 10).spin((idx % 3) * -15).toString()
    } else if (idx <= 15) {
      return tinycolor(color).lighten((idx % 3) * 15).spin((idx % 3) * -25).toString()
    } else {
      return color
    }
  }

  // CREATES COLOR MAP FOR ALL CURRENT MEASURES
  allResults.forEach((category) => {
    baseColors.push({
      value: category.measure,
      color: colorBySeed(category.measure)
    })
  })

  // HANDLES COMPOSITE VIEW
  if (!displayData || displayData.length === 0) {
    return baseColors
  } else {
    // HANDLES MEASURE VIEW
    const baseMeasure = displayData[0].measure
    const baseMeasureColor = baseColors.find((mapping) => mapping.value === baseMeasure).color
    byMeasureColorMap.push({
      value: baseMeasure,
      color: baseMeasureColor
    })
    displayData.splice(0, 1)

    // ADD SUBMEASURES WITH MODIFIED COLOURS
    displayData.forEach((category, idx) => {
      byMeasureColorMap.push({
        value: category.measure,
        color: distortColor(baseMeasureColor, idx)
      })
    })
  }
  console.log('byMeasureColorMap', byMeasureColorMap)
  return byMeasureColorMap;
};

export default ColorMapping;
