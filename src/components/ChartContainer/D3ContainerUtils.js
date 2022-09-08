export function filterByStars(displayData, filters, store) {
  return (displayData.filter((result) => filters.stars.includes(
    Math.floor( // Floor for the .5 stars.
      store.currentResults.find(
        (current) => current.measure === result.measure,
      ).starRating,
    ),
  )));
}

export function filterByPercentage(displayData, filters, store) {
  return (displayData.filter((result) => {
    const { value } = store.currentResults.find(
      (current) => current.measure === result.measure,
    );
    return (
      value >= filters.percentRange[0] && value <= filters.percentRange[1]
    );
  }));
}

export function filterByDOC(displayData, filters, store) {
  return displayData.filter(
    (result) => filters.domainsOfCare.includes(store.info[result.measure].domainOfCare),
  );
}

export function filterByTimeline(timelineDisplayData, timeline) {
  if (timeline.choice !== 'all') {
    let dayLimit = 0;
    if (timeline.choice === 'YTD') {
      dayLimit = new Date(new Date().getFullYear(), 0, 1).getTime();
    } else {
      dayLimit = new Date().getTime() - (parseInt(timeline.choice, 10) * 24 * 60 * 60 * 1000);
    }
    return timelineDisplayData.filter((result) => new Date(result.date) > dayLimit);
  }
  return timelineDisplayData;
}

export function expandSubMeasureResults(selectedMeasure, results) {
  const expandedResults = [];
  results.filter(
    (result) => result.measure === selectedMeasure.measure,
  ).forEach((byLine) => {
    expandedResults.push(byLine);
    if (selectedMeasure.subScores && selectedMeasure.subScores.length > 1) {
      byLine.subScores.forEach((subScore) => expandedResults.push(subScore));
    }
  });
  return expandedResults;
}

export function getSubMeasureCurrentResults(activeMeasure, store) {
  let subMeasureCurrentResults = [];
  const subMeasurePrime = store.currentResults.find(
    (item) => item.measure === activeMeasure.measure,
  );
  if (subMeasurePrime.subScores && subMeasurePrime.subScores.length > 1) {
    subMeasureCurrentResults = [subMeasurePrime, ...subMeasurePrime.subScores];
  } else {
    subMeasureCurrentResults = [subMeasurePrime];
  }
  return subMeasureCurrentResults;
}
