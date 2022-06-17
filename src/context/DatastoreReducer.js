import { updateTimestamp } from '../components/Utilities/GeneralUtil';

export const initialState = {
  results: [], // All results for the last several days, per measure.
  trends: [],
  currentResults: [], // Results for the most recent day for each measure.
  info: {},
  lastUpdated: 'Updating now...',
  isLoading: true,
};

const createLabel = (measure, info) => {
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

const createSubMeasureLabel = (subMeasure, info) => {
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

export const DatastoreReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESULTS': {
      const workingList = {};
      const { results, info } = action.payload;
      results.forEach((item) => {
        if (workingList[item.measure] === undefined
          || item.date > workingList[item.measure].date) {
          workingList[item.measure] = item;
        }
      });
      Object.keys(workingList).forEach((key) => {
        workingList[key].label = createLabel(workingList[key].measure, info);
        workingList[key].shortLabel = info[workingList[key].measure]?.displayLabel;
        workingList[key].title = info[workingList[key].measure]?.title;
        if (workingList[key].subScores) {
          workingList[key].subScores.forEach((subscore) => {
            const newSubscore = subscore;
            newSubscore.label = createSubMeasureLabel(newSubscore.measure, info);
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
        ...state,
        results,
        currentResults,
        info,
        lastUpdated: updateTimestamp(new Date()),
      }
    }
    case 'SET_TRENDS':
      return {
        ...state,
        trends: action.payload,
        lastUpdated: updateTimestamp(new Date()),
      }
    case 'SET_ISLOADING':
      return {
        ...state,
        isLoading: action.payload,
        lastUpdated: updateTimestamp(new Date()),
      }
    default:
      return state;
  }
}
