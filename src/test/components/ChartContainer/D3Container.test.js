import { filterByStars, filterByPercentage, filterByDOC } from '../../../components/ChartContainer/D3ContainerUtils';
import { DatastoreReducer } from '../../../context/DatastoreReducer';
import { resultList, infoObject } from '../../data/DemoData';

describe('Tests the logic of the D3Component\'s filters', () => {
  const mockInitState = {
    results: [],
    trends: [],
    currentResults: [],
    info: {},
    lastUpdated: 'Updating now...',
  }

  test('Filter by stars', () => {
    const starFilterMock = {
      domainsOfCare: [],
      stars: [2, 1],
      percentRange: [0, 100],
      sum: 2,
    }
    const mockDataStore = DatastoreReducer(mockInitState, { type: 'SET_RESULTS', payload: { results: resultList, info: infoObject } })
    expect(filterByStars(resultList, starFilterMock, mockDataStore).length).toBe(64);
  })

  test('Filter by percentage', () => {
    const percentFilterMock = {
      domainsOfCare: [],
      stars: [],
      percentRange: [50, 75],
      sum: 1,
    }
    const mockDataStore = DatastoreReducer(mockInitState, { type: 'SET_RESULTS', payload: { results: resultList, info: infoObject } })
    expect(filterByPercentage(resultList, percentFilterMock, mockDataStore).length).toBe(32);
  })

  test('Filter by Domain of Care', () => {
    const docFilterMock = {
      domainsOfCare: ['ECDS'],
      stars: [],
      percentRange: [0, 100],
      sum: 1,
    }
    const mockDataStore = DatastoreReducer(mockInitState, { type: 'SET_RESULTS', payload: { results: resultList, info: infoObject } })
    expect(filterByDOC(resultList, docFilterMock, mockDataStore).length).toBe(48);
  })
})
