import { updateTimestamp } from '../components/Utilities/GeneralUtil';
import { createLabel, createSubMeasureLabel } from '../components/ChartContainer/D3ContainerUtils';

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

const defaultFilterState = {
  domainsOfCare: [],
  stars: [],
  percentRange: [0, 100],
  sum: 0,
  payors: [],
  healthcareProviders: [],
  healthcareCoverages: [],
  healthcarePractitioners: [],
};
const defaultTimelineState = {
  choice: 'all', // 30, 60, ytd or custom.
  range: [null, null],
};

export const initialState = {
  datastoreLoading: true,
  results: [], // All results for the last several days, per measure.
  trends: [],
  currentResults: [], // Results for the most recent day for each measure.
  info: {},
  lastUpdated: 'Updating now...',
  defaultFilterState,
  chartColorArray,
  defaultTimelineState,
  filterOptions: {
    payors: [],
    healthcareProviders: [],
    healthcareCoverages: [],
    healthcarePractitioners: [],
  },
};

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
    case 'SET_FILTER_OPTIONS':
      return {
        ...state,
        defaultFilterState: {
          ...state.defaultFilterState,
        },
        filterOptions: {
          payors: action.payload.payors,
          healthcareProviders: action.payload.healthcareProviders,
          healthcareCoverages: action.payload.healthcareCoverages,
          healthcarePractitioners: action.payload.practitioners,
        },
      }
    case 'SET_ISLOADING':
      return {
        ...state,
        datastoreLoading: action.payload,
        lastUpdated: updateTimestamp(new Date()),
      }
    default:
      return state;
  }
}
