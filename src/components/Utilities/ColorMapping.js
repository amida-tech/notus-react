const ColorMapping = (displayData) => {
  const colorMapping = [
    {
      value: 'composite',
      color: '#88CCEE',
    },
    {
      value: 'aab',
      color: '#CC6677',
    },
    {
      value: 'adde',
      color: '#DDCC77',
    },
    {
      value: 'aise',
      color: '#117733',
    },
    {
      value: 'apme',
      color: '#332288',
    },
    {
      value: 'asfe',
      color: '#AA4499',
    },
    {
      value: 'bcse',
      color: '#44AA99',
    },
    {
      value: 'ccs',
      color: '#999933',
    },
    {
      value: 'cise',
      color: '#661100',
    },
    {
      value: 'cole',
      color: '#6699CC',
    },
    {
      value: 'cou',
      color: '#888888',
    },
    {
      value: 'cwp',
      color: '#000000',
    },
    {
      value: 'dmse',
      color: '#CC6677',
    },
    {
      value: 'drre',
      color: '#DDCC77',
    },
    {
      value: 'dsfe',
      color: '#117733',
    },
    {
      value: 'fum',
      color: '#332288',
    },
    {
      value: 'imae',
      color: '#AA4499',
    },
    {
      value: 'pdse',
      color: '#44AA99',
    },
    {
      value: 'pnde',
      color: '#999933',
    },
    {
      value: 'prse',
      color: '#661100',
    },
    {
      value: 'psa',
      color: '#6699CC',
    },
    {
      value: 'uop',
      color: '#888888',
    },
    {
      value: 'uri',
      color: '#88CCEE',
    },
  ]

  if (!displayData) {
    return colorMapping
  }

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
  ];

  // console.log('displayData:', displayData)

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

  console.log('color map return:', byMeasureColorMap)

  return byMeasureColorMap;
};

export default ColorMapping;
