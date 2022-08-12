import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { resultList, trendList, infoObject } from '../test/data/DemoData';
import { DatastoreReducer, initialState } from './DatastoreReducer';
import env from '../env';

const axios = require('axios').default;

const useLegacyResults = env.REACT_APP_LEGACY_RESULTS;
const searchUrl = useLegacyResults === 'true'
  ? new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/searchResults`)
  : new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/dailyMeasureResults`);
const trendUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/trends?legacyResults=${useLegacyResults}`);
const infoUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/info`);
const devData = `${env.REACT_APP_DEV_DATA}`;

export const DatastoreContext = createContext(initialState);

export default function DatastoreProvider({ children }) {
  const [datastore, dispatch] = useReducer(DatastoreReducer, initialState);

  const datastoreActions = useMemo(() => ({
    setResults: (results, info) => dispatch({ type: 'SET_RESULTS', payload: { results, info } }),
    setTrends: (trends) => dispatch({ type: 'SET_TRENDS', payload: trends }),
    setIsLoading: (isLoading) => dispatch({ type: 'SET_ISLOADING', payload: isLoading }),
  }), [dispatch]);

  useEffect(() => {
    if (devData === 'true') {
      datastoreActions.setResults(resultList, infoObject);
      datastoreActions.setTrends(trendList);
      datastoreActions.setIsLoading(false);
    } else {
      axios.get(trendUrl)
        .then((res) => {
          datastoreActions.setTrends(res.data);
        });

      const searchPromise = axios.get(searchUrl)

      const infoPromise = axios.get(infoUrl)

      Promise.all([searchPromise, infoPromise]).then((values) => {
        console.log(values[1].data)
        datastoreActions.setResults(values[0].data, values[1].data);
        datastoreActions.setIsLoading(false);
      });
    }
  }, [datastoreActions]);

  const reducerValue = useMemo(() => ({
    datastore, datastoreActions,
  }), [datastore, datastoreActions]);

  return (
    <DatastoreContext.Provider value={reducerValue}>
      {children}
    </DatastoreContext.Provider>
  )
}

DatastoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
