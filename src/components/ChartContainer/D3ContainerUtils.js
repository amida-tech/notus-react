export function filterByStars(displayData, filters, currentResults) {
  return (displayData.filter((result) => filters.stars.includes(
    Math.floor( // Floor for the .5 stars.
      currentResults.find(
        (current) => current.measure === result.measure,
      ).starRating,
    ),
  )));
}

export function filterByPercentage(displayData, filters, currentResults) {
  return (displayData.filter((result) => {
    const { value } = currentResults.find(
      (current) => current.measure === result.measure,
    );
    return (
      value >= filters.percentRange[0] && value <= filters.percentRange[1]
    );
  }));
}

export function filterByDOC(displayData, filters, storeInfo) {
  return displayData.filter(
    (result) => filters.domainsOfCare.includes(storeInfo[result.measure].domainOfCare),
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

export function getSubMeasureCurrentResults(activeMeasure, currentResults) {
  let subMeasureCurrentResults = [];
  const subMeasurePrime = currentResults.find(
    (item) => item.measure === activeMeasure.measure,
  );
  if (subMeasurePrime.subScores && subMeasurePrime.subScores.length > 1) {
    subMeasureCurrentResults = [subMeasurePrime, ...subMeasurePrime.subScores];
  } else {
    subMeasureCurrentResults = [subMeasurePrime];
  }
  return subMeasureCurrentResults;
}
export function getSubMeasureCurrentResultsPerMeasure(givenMeasure, currentResults) {
  let subMeasureCurrentResults = [];
  const subMeasurePrime = currentResults.find(
    (item) => item.measure === givenMeasure,
  );
  if (subMeasurePrime.subScores && subMeasurePrime.subScores.length > 1) {
    subMeasureCurrentResults = [subMeasurePrime, ...subMeasurePrime.subScores];
  } else {
    subMeasureCurrentResults = [subMeasurePrime];
  }
  return subMeasureCurrentResults;
}
export const createLabel = (measure, info) => {
  if (info[measure]) {
    return `${info[measure].displayLabel} - ${info[measure].title}`
  }
  if (measure === 'composite') {
    return 'Composite';
  }
  if (measure.length > 3 && measure.charAt(3) === 'e') {
    return `${measure.slice(0, 3).toUpperCase()}-E`;
  }
  return measure.toUpperCase();
}

export const createSubMeasureLabel = (subMeasure, info) => {
  let displayLabel = '';
  if (subMeasure.length > 3 && subMeasure.charAt(3) === 'e') {
    displayLabel = `${subMeasure.slice(0, 3).toUpperCase()}-E`;
  } else {
    displayLabel = subMeasure.toUpperCase();
  }

  if (info[subMeasure]) {
    return `${displayLabel} - ${info[subMeasure].title}`
  }

  return displayLabel;
}

export const calcMemberResults = (dailyMeasureResults, measureInfo) => {
  const workingList = {};
  dailyMeasureResults.forEach((item) => {
    if (workingList[item.measure] === undefined
            || item.date > workingList[item.measure].date) {
      workingList[item.measure] = item;
    }
  });
  Object.keys(workingList).forEach((key) => {
    workingList[key].label = createLabel(workingList[key].measure, measureInfo);
    workingList[key].shortLabel = measureInfo[workingList[key].measure]?.displayLabel;
    workingList[key].title = measureInfo[workingList[key].measure]?.title;
    if (workingList[key].subScores) {
      workingList[key].subScores.forEach((subscore) => {
        const newSubscore = subscore;
        newSubscore.label = createSubMeasureLabel(newSubscore.measure, measureInfo);
      });
    }
  });
  const currentResults = Object.values(workingList)
    .sort((a, b) => {
      if (a.measure === 'composite') return -1;
      if (b.measure === 'composite') return 1;
      return a.measure > b.measure ? 1 : -1;
    });

  return {
    results: dailyMeasureResults,
    currentResults,
  }
}
export const lineChartOptions = (
  displayData,
  colorMap,
  measureInfo,
  graphWidth,
  currentTimeline,
  chartStuff,
) => {
  const chart = {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true,
    },
  }
  const dataLabels = {
    enabled: false,
  }
  const stroke = {
    curve: 'smooth',
  }
  const title = {
    text: 'Measure By Line',
    align: 'left',
  }
  const grid = {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  }
  const xaxis = {
    type: 'category',
    // categories: ['2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z','2022-10-16T00:00:00.000Z'],
    categories: chartStuff[0].data.map((entry) => entry.date),
    tickAmount: undefined,
    tickPlacement: 'between',
    min: undefined,
    max: undefined,
    range: undefined,
    floating: false,
    decimalsInFloat: undefined,
    overwriteCategories: undefined,
    position: 'bottom',
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: [],
        fontSize: '8px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        // cssClass: 'apexcharts-xaxis-label',
      },
      offsetX: 0,
      offsetY: 0,
      format: undefined,
      formatter(value) {
        return new Date(value);
      },
      datetimeUTC: true,
      datetimeFormatter: {
        year: 'yyyy',
        month: "MMM 'yy",
        day: 'dd MMM',
        hour: 'HH:mm',
      },
    },
    axisBorder: {
      show: true,
      color: '#78909C',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: 'solid',
      color: '#78909C',
      height: 6,
      offsetX: 0,
      offsetY: 0,
    },

    title: {
      text: undefined,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
      },
    },
    crosshairs: {
      show: true,
      width: 1,
      position: 'back',
      opacity: 0.9,
      stroke: {
        color: '#b6b6b6',
        width: 0,
        dashArray: 0,
      },
    },
  }
  const yaxis = {
    labels: {
      formatter(value) {
        return `${value.toFixed(2)}%`;
      },
      style: {
        color: undefined,
        fontSize: '15px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  }
  return {
    chart,
    dataLabels,
    stroke,
    title,
    // grid,
    xaxis,
    yaxis,
  }
}

// export const lineChartOptions = (

//   dataType,
//   chartDataLegend,
//   chartDataTriumph,
//   chartDataGrizzly,
//   chartDataBigWave
//   displayData,
//   colorMap,
//   measureInfo,
//   graphWidth,
//   currentTimeline,
// ) => {
//   const chart = {
//     toolbar: {
//       show: true,
//       offsetX: 0,
//       offsetY: 0,
//       tools: {
//         download: false,
//         selection: true,
//         // customIcons: [
//         //   {
//         //     icon: "10",
//         //     index: 6,
//         //     title: "10 Min Chart",
//         //     class: "custom-icon",
//         //     click: function (chart, options, e) {
//         //       console.log("10 Min Chart");
//         //     },
//         //   },
//         //   {
//         //     icon: "5",
//         //     index: 5,
//         //     title: "5 Min Chart",
//         //     class: "custom-icon",
//         //     click: function (chart, options, e) {
//         //       console.log("5 Min Chart");
//         //     },
//         //   },
//         //   {
//         //     icon: "3",
//         //     index: 4,
//         //     title: "3 Min Chart",
//         //     class: "custom-icon",
//         //     click: function (chart, options, e) {
//         //       console.log("3 Min Chart");
//         //     },
//         //   },
//         //   {
//         //     icon: "1",
//         //     index: 3,
//         //     title: "1 Min Chart",
//         //     class: "custom-icon",
//         //     click: function (chart, options, e) {
//         //       console.log("1 Min Chart");
//         //     },
//         //   },
//         // ],
//         zoom: true,
//         zoomin: true,
//         zoomout: true,
//         pan: false,
//         reset: true | '<img src="/static/icons/reset.png" width="20">',
//       },
//       export: {
//         csv: {
//           filename: undefined,
//           columnDelimiter: ",",
//           headerCategory: "category",
//           headerValue: "value",
//           dateFormatter(timestamp) {
//             return new Date(timestamp).toDateString();
//           },
//         },
//         svg: {
//           filename: undefined,
//         },
//         png: {
//           filename: undefined,
//         },
//       },
//       autoSelected: "zoom",
//     },
//   };
//   const tooltip = {
//     theme: "dark",
//   };
//   const dataLabels = {
//     enabled: false,
//   };
//   const stroke = {
//     curve: "smooth",
//   };
//   const xaxis = {
//     type: "datetime",
//     categories:
//       dataType === "OVERALL"
//         ? populatedData(chartDataLegend)
//         : dataType === "BIGWAVE"
//         ? populatedData(chartDataBigWave)
//         : dataType === "LEGEND"
//         ? populatedData(chartDataLegend)
//         : dataType === "GRIZZLY"
//         ? populatedData(chartDataGrizzly)
//         : dataType === "TRIUMPH"
//         ? populatedData(chartDataTriumph)
//         : null,
//     labels: {
//       style: {
//         colors: "#c8cfca",
//         fontSize: "12px",
//       },
//     },
//   };
//   const yaxis = {
//     labels: {
//       style: {
//         colors: "#c8cfca",
//         fontSize: "12px",
//       },
//     },
//   };
//   //   const legend = {
//   //     show: true,
//   //   };
//   const legend = {
//     show: true,
//     showForSingleSeries: false,
//     showForNullSeries: true,
//     showForZeroSeries: true,
//     position: "bottom",
//     horizontalAlign: "center",
//     floating: false,
//     fontSize: "14px",
//     fontFamily: "Helvetica, Arial",
//     fontWeight: 400,
//     formatter: undefined,
//     inverseOrder: false,
//     width: undefined,
//     height: undefined,
//     tooltipHoverFormatter: undefined,
//     customLegendItems: [],
//     offsetX: 0,
//     offsetY: 0,
//     labels: {
//       colors: undefined,
//       useSeriesColors: false,
//     },
//     markers: {
//       width: 12,
//       height: 12,
//       strokeWidth: 0,
//       strokeColor: "#fff",
//       fillColors: undefined,
//       radius: 12,
//       customHTML: undefined,
//       onClick: undefined,
//       offsetX: 0,
//       offsetY: 0,
//     },
//     itemMargin: {
//       horizontal: 5,
//       vertical: 0,
//     },
//     onItemClick: {
//       toggleDataSeries: true,
//     },
//     onItemHover: {
//       highlightDataSeries: true,
//     },
//   };
//   const grid = {
//     strokeDashArray: 13,
//   };
//   const fill = {
//     type: "gradient",
//     gradient: {
//       shade: "light",
//       type: "vertical",
//       shadeIntensity: 0.5,
//       gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
//       inverseColors: true,
//       opacityFrom: 0.8,
//       opacityTo: 0,
//       stops: [],
//     },
//     colors:
//       dataType === "OVERALL"
//         ? ["#4FD1C5", "#493398", "#2374AB", "#FFCB77", "#4FD1C5"]
//         : dataType === "BIGWAVE"
//         ? ["#4FD1C5"]
//         : dataType === "LEGEND"
//         ? ["#493398"]
//         : dataType === "GRIZZLY"
//         ? ["#2374AB"]
//         : dataType === "TRIUMPH"
//         ? ["#FFCB77"]
//         : ["grey"],
//   };
//   const colors =
//     dataType === "OVERALL"
//       ? ["#4FD1C5", "#493398", "#2374AB", "#FFCB77", "#4FD1C5"]
//       : dataType === "BIGWAVE"
//       ? ["#4FD1C5"]
//       : dataType === "LEGEND"
//       ? ["#493398"]
//       : dataType === "GRIZZLY"
//       ? ["#2374AB"]
//       : dataType === "TRIUMPH"
//       ? ["#FFCB77"]
//       : ["grey"];

//   return {
//     chart,
//     tooltip,
//     dataLabels,
//     stroke,
//     xaxis,
//     yaxis,
//     legend,
//     grid,
//     fill,
//     colors,
//   };
// };
