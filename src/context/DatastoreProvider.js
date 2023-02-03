import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  resultList, trendList, infoObject, userPreferences,
} from '../test/data/DemoData';
import { DatastoreReducer, initialState } from './DatastoreReducer';
import env from '../env';

const useLegacyResults = env.REACT_APP_LEGACY_RESULTS;
const searchUrl = useLegacyResults === 'true'
  ? new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/searchResults`)
  : new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/dailyMeasureResults`);
const trendUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/trends?legacyResults=${useLegacyResults}`);
const infoUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/info`);
const payorsUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}payors`);
const healthcareProvidersUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}healthcareproviders`);
const healthcareCoveragesUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}healthcarecoverages`);
const practitionersUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}practitioners`);

const devData = `${env.REACT_APP_DEV_DATA}`;

export const DatastoreContext = createContext(initialState);

export default function DatastoreProvider({ children }) {
  const [datastore, dispatch] = useReducer(DatastoreReducer, initialState);

  const datastoreActions = useMemo(() => ({
    setResults: (results, info) => dispatch({
      type: 'SET_RESULTS',
      payload: { results, info },
    }),

    setMemberResults: (memberResults) => dispatch({
      type: 'SET_MEMBER_RESULTS',
      payload: memberResults,
    }),

    setTrends: (trends) => dispatch({
      type: 'SET_TRENDS',
      payload: trends,
    }),

    setPreferences: (preferences) => dispatch({
      type: 'SET_PREFERENCES',
      payload: preferences,
    }),

    setHealthcareFilterOptions:
      (payors, healthcareProviders, healthcareCoverages, practitioners) => dispatch({
        type: 'SET_FILTER_OPTIONS',
        payload: {
          payors,
          healthcareProviders,
          healthcareCoverages,
          practitioners,
        },
      }),

    setIsLoading: (isLoading) => dispatch({
      type: 'SET_ISLOADING',
      payload: isLoading,
    }),

  }), [dispatch]);

  useEffect(() => {
    if (devData === 'true') {
      datastoreActions.setResults(resultList, infoObject);
      datastoreActions.setTrends(trendList);
      datastoreActions.setPreferences(userPreferences);
      datastoreActions.setIsLoading(false);
    } else {
      const trendPromise = axios.get(trendUrl);
      const searchPromise = axios.get(searchUrl);
      const infoPromise = axios.get(infoUrl);
      const payorsPromise = axios.get(payorsUrl);
      const healthcareProvidersPromise = axios.get(healthcareProvidersUrl);
      const healthcareCoveragesPromise = axios.get(healthcareCoveragesUrl);
      const practitionersPromise = axios.get(practitionersUrl);
      // this is placeholder preferences
      const newUserPreferences = {
        ratingTrends: {
          0: {
            type: 'star',
            measure: 'aab',
          },
          1: {
            type: 'percentage',
            measure: 'asfe',
          },
          2: {
            type: 'star',
            measure: 'uri',
          },
          3: {
            type: 'percentage',
            measure: 'composite',
          },
        },
        theme: 'light',
      };

      Promise.all([
        searchPromise,
        infoPromise,
        payorsPromise,
        healthcareProvidersPromise,
        healthcareCoveragesPromise,
        practitionersPromise,
        trendPromise,
      ]).then((values) => {
        datastoreActions.setHealthcareFilterOptions(
          values[2].data.payors,
          values[3].data.healthcareProviders,
          values[4].data.healthcareCoverages,
          values[5].data.practitioner,
        );
        datastoreActions.setResults(values[0].data, values[1].data);
        datastoreActions.setTrends(values[6].data);
        // currently only front end default preferences
        datastoreActions.setPreferences(newUserPreferences);
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
  );
}

DatastoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
