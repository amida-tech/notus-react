import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { sortedTrendsCreator, mainTrendCreator } from '../../../components/Summary/RatingTrendsUtils';
import Info from '../../../components/Common/Info';
import TrendDisplay from '../../../components/Summary/TrendDisplay';
import RatingTrends from '../../../components/Summary/RatingTrends';
import Banner from '../../../components/Common/Banner'
import { DatastoreReducer } from '../../../context/DatastoreReducer';
import { resultList, infoObject, trendList } from '../../data/DemoData';

describe('Banner', () => {
  test('checks that the timestamp rendered', () => {
    const date = '4-20-2022'
    render(
      <Banner lastUpdated={date} />,
    );
    expect(screen.queryByText(date)).not.toBeNull();
  })
});

describe('Info', () => {
  test('Opens and closes the info component, making sure text renders properly at each step', () => {
    const infoText = '418: I am a Teapot';
    render(
      <Info infoText={infoText} />,
    )
    expect(screen.queryByText(infoText)).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(infoText)).not.toBeNull();
    fireEvent.click(screen.getByText('CLOSE').closest('button'));
    expect(screen.queryByText(infoText)).toBeNull();
  })
});

describe('TrendDisplay', () => {
  const trend1 = { measure: 'ABC', percentChange: 50 }
  const trend2 = { measure: 'EFG', percentChange: -50 }
  const width1 = 25;
  const width2 = 50;
  const trendNa = { measure: 'I\'m Fake', percentChange: undefined };
  const widthNa = 0;

  test('tests the trend1 and width1 passthrough', () => {
    const { container } = render(
      <TrendDisplay trend={trend1} percentWidth={width1} />,
    )
    expect(screen.queryByText('ABC Score % Change')).not.toBeNull()
    expect(screen.queryByText('+50 %')).not.toBeNull()
    expect(container.firstChild.classList.contains('trend-display--width-25')).toBe(true)
  })

  test('tests the trend2 and width2 passthrough', () => {
    const { container } = render(
      <TrendDisplay trend={trend2} percentWidth={width2} />,
    )
    expect(screen.queryByText('EFG Score % Change')).not.toBeNull()
    expect(screen.queryByText('-50 %')).not.toBeNull()
    expect(container.firstChild.classList.contains('trend-display--width-50')).toBe(true)
  })

  test('tests the trendNa and widthNa passthrough', () => {
    const { container } = render(
      <TrendDisplay trend={trendNa} percentWidth={widthNa} />,
    )
    expect(container.firstChild.classList.contains('trend-display--hide')).toBe(true)
  })
})
describe('RatingTrends', () => {
  const mockInitState = {
    results: [],
    trends: [],
    currentResults: [],
    info: {},
    lastUpdated: 'Updating now...',
  }
  const mockDataStore = DatastoreReducer(mockInitState, { type: 'SET_RESULTS', payload: { results: resultList, info: infoObject } })
  const mockActiveMeasure = {
    _id: 'composite-2022-02-27',
    measure: 'composite',
    date: '2022-02-27T00:00:00.000Z',
    value: 45.863095238095234,
    starRating: 2.5,
    numerator: 78,
    denominator: 177,
    initialPopulation: 183,
    exclusions: 129,
    label: 'Composite - Composite Score',
    shortLabel: 'Composite',
    title: 'Composite Score',
  }
  const mockTrends = trendList;

  test('tests mainTrendCreator', () => {
    const MockMeasureTrend = mockTrends
      .find((trend) => trend.measure === mockActiveMeasure.measure);
    const mainTrend = mainTrendCreator(mockActiveMeasure, mockDataStore.info, MockMeasureTrend);
    expect(mainTrend.measure === 'Composite').toBe(true);
    expect(mainTrend.percentChange === -9).toBe(true);
  })

  test('tests sortedTrendsCreator', () => {
    const MockMeasureTrend = mockTrends
      .find((trend) => trend.measure === mockActiveMeasure.measure);
    expect(sortedTrendsCreator(mockActiveMeasure, mockTrends, MockMeasureTrend)
      .length === 4).toBe(true);
  })

  test('tests rendering functionality', () => {
    render(
      <RatingTrends
        activeMeasure={mockActiveMeasure}
        info={mockDataStore.info}
        trends={mockTrends}
      />,
    )
    expect(screen.queryByText('Ratings & Trends')).not.toBeNull()
    expect(screen.queryByText('Composite Score % Change')).not.toBeNull()
    expect(screen.queryByText('Star Rating')).not.toBeNull()
    expect(screen.queryByText('DRR-E Score % Change')).not.toBeNull()
  })
})
