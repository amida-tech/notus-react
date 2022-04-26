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
