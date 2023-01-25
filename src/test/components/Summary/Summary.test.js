import {
  fireEvent, render, screen, within,
} from '@testing-library/react';
import RatingTrendBox from 'components/Summary/RatingTrendBox';
import Info from '../../../components/Common/Info';

import RatingTrends from '../../../components/Summary/RatingTrends';
import Banner from '../../../components/Common/Banner'
import { DatastoreReducer } from '../../../context/DatastoreReducer';
import { currentResults, trendList, userPreferences } from '../../data/DemoData';

describe('Banner', () => {
  test('checks that the timestamp rendered', () => {
    const date = '4-20-2022'
    render(
      <Banner lastUpdated={date} />,
    );
    expect(screen.queryByText(date)).not.toBeNull();
  })
});

describe('RatingTrends', () => {
  beforeEach(() => {
    render(
      <RatingTrendBox
        trends={trendList}
        widgetPrefs={userPreferences.ratingTrends[0]}
        currentResults={currentResults}
      />,
    )
  })

  it('links render', () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
  })
})
