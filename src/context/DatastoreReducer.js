import { updateTimestamp } from '../components/Utilities/GeneralUtil';
import { calcMemberResults } from '../components/ChartContainer/D3ContainerUtils';

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
  memberResults: [],
  memberResultsCount: 0,
  memberResultsTotalCount: 0,
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
      const { results, info } = action.payload;
      const { currentResults } = calcMemberResults(results, info)
      return {
        ...state,
        results,
        currentResults,
        info,
        lastUpdated: updateTimestamp(new Date()),
      }
    }
    case 'SET_MEMBER_RESULTS': {
      const { Members, totalCount } = action.payload.memberResults
      const initialLoad = action.payload.initialLoad
      if (initialLoad) {
        return {
          ...state,
          memberResults: Members,
          memberResultsCount: Members.length,
          memberResultsTotalCount: totalCount,
        }
      } else {
        let  MembersArray = [];

        MembersArray =[...state.memberResults];

        Members.forEach((member) => {
          if (MembersArray.length > 0){
            const memberFilter = MembersArray.filter((mem) => {
              if (mem.memberId === member.memberId){
                return mem
              }
            })
            if (memberFilter.length === 0){
              MembersArray.push(member)
            }
          }
          // let difference = Members.filter(x => state.memberResults.indexOf(x) === -1);
        })
        return {
          ...state,
          memberResults: MembersArray,
          memberResultsCount: MembersArray.length,
          memberResultsTotalCount: totalCount,
        }
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
