import tinycolor from 'tinycolor2'

const ColorMapping = (allResults, displayData) => {
  console.log('>>>>>>>>>>>>>>COLOR MAPPING START>>>>>>>>>>>>>>>>.')
  // console.log('all measures:', allResults)
  // console.log('measures to be  coloured:', displayData)

  const chartColorArray = [
    '#88CCEE',
    '#CC6677',
    '#DDCC77',
    '#117733',
    '#332288',
    '#AA4499',
    '#44AA99',
    '#999933',
    '#661100',
    '#6699CC',
    '#888888',
    // NOT APPROVED BELOW THIS LINE
    '#FB0505',
    '#FB9C05',
    '#E4DB05',
    '#D0FB05',
    '#9AFB05',
    '#05FB7B',
    '#05FBF9',
    '#057EFB',
    '#0516FB', // APME
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
    // console.log('base colors for all measures:', baseColors)
    return baseColors
  } else {
    // HANDLES MEASURE VIEW
    // SEARCH FOR BASE COLOR OF MEASURE
    const baseMeasure = displayData[0].measure
    const baseMeasureColor = baseColors.find((mapping) => mapping.value === baseMeasure).color

    // ADD MEASURE WITH BASE COLOR
    byMeasureColorMap.push({
      value: baseMeasure,
      color: baseMeasureColor
    })
    displayData.splice(0, 1)

    // console.log('time to color:', chartColorArray, displayData)

    // ADD SUBMEASURES WITH MODIFIED COLOURS
    displayData.forEach((category, idx) => {
      // console.log('time to assign a color', category)
      byMeasureColorMap.push({
        value: category.measure,
        color: distortColor(baseMeasureColor, idx)
      })
    })
  }
  // console.log('color map return:', byMeasureColorMap)
  console.log('byMeasureColorMap', byMeasureColorMap)
  return byMeasureColorMap;
};

export default ColorMapping;
