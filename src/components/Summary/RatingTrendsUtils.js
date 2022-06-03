export function sortedTrendsCreator(activeMeasure, trends, measureTrend) {
  let sortedTrends = [];
  if (activeMeasure.measure === 'composite') {
    sortedTrends = trends
      .filter((trend) => trend.measure !== 'composite')
      .sort((a, b) => b.percentChange - a.percentChange);
  } else if (activeMeasure.measure && measureTrend?.subScoreTrends) {
    sortedTrends = measureTrend.subScoreTrends
      .sort((a, b) => b.percentChange - a.percentChange);
  }
  return sortedTrends;
}

export function mainTrendCreator(activeMeasure, info, measureTrend) {
  const mainTrend = { measure: '', percentChange: undefined };
  mainTrend.measure = info[activeMeasure.measure] !== undefined ? info[activeMeasure.measure].displayLabel : '';
  mainTrend.percentChange = measureTrend === undefined ? undefined : measureTrend.percentChange;
  return mainTrend;
}
