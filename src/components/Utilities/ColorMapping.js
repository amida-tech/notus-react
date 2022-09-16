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
    // NOT APPROVED BELOW THIS LINE
    '#FB0505',
    '#FB9C05',
    '#E4DB05',
    '#D0FB05',
    '#9AFB05',
    '#05FB7B',
    '#05FBF9',
    '#057EFB',
    '#0516FB',
    '#5205FB',
    '#BE05FB',
    '#FB05D6',
    '#FB0566',
  ];

  const baseColors = []
  const byMeasureColorMap = [];

  const colorBySeed = (seed) => chartColorArray.pop(seed.split('').length, 1)

  const distortColor = (color, idx) => {
    if (idx <= 3) {
      return tinycolor(color).brighten(idx * 15).spin(10).toString()
    } else if (idx <= 6) {
      return tinycolor(color).darken(idx * 5).spin(10).toString()
    } else if (idx <= 9) {
      return tinycolor(color).saturate(idx * 5).spin(10).toString()
    } else if (idx <= 12) {
      return tinycolor(color).desaturate(idx * 2).spin(10).toString()
    } else if (idx <= 15) {
      return tinycolor(color).darken(idx * 2).saturate(i * 2).spin(10).toString()
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
  return byMeasureColorMap;
};

export default ColorMapping;
