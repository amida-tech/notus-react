import {
  fireEvent,
  render, screen, within,
} from '@testing-library/react';
import RatingTrends from '../../../components/Summary/RatingTrends';
import RatingTrendBox from '../../../components/Summary/RatingTrendBox';
import {
  activeMeasure, trendList, widgetPrefs, currentResults,
} from '../../data/DemoData';

describe('RatingTrends', () => {
  beforeEach(() => {
    render(
      <RatingTrends
        currentResults={currentResults}
        activeMeasure={activeMeasure}
        trends={trendList}
        widgetPrefs={widgetPrefs}
      />
    )
  })

  // Percentages are output as headers, so we need 2 plus the regular headers
  it('headers render', () => {
    const headers = screen.getAllByRole('heading')
    expect(headers.length).toBe(7)
  })

  // Info button plus four draggable components that render as buttons
  it('buttons render', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(5)
  })

  // Star ratings details output as img tags, so we need 2
  it('star ratings render', () => {
    const starRatings = screen.getAllByRole('img')
    expect(starRatings.length).toBe(2)
  })

  // check for info button and info header
  it('widget headers have correct information', () => {
    expect(screen.getByText('Ratings & Trends')).toBeTruthy()

    // help pop up
    const helpIcons = screen.getAllByTestId('HelpIcon')
    const starLabel = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.'
    const widgetLabel = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'

    console.log('helpIcons:', helpIcons)

    // default props in store for dev mode
    const defaultStoreHeaders = {
      'aab': 'star',
      'asfe': 'percent',
      'uri': 'star',
      'Composite': 'percent',
    }

    Object.entries(defaultStoreHeaders).forEach(([header, type]) => {
      if (type === 'star') {
        console.log('hit')
        expect(screen.getByText(`${header.toUpperCase()} Star Rating`)).toBeTruthy()
      } else {
        expect(screen.getByText(`${header.toUpperCase()} Score % Change`)).toBeTruthy()
      }
    })
  })

  // check for headers specifically
  // it('widget headers for measures render', () => {
  //   expect(screen.getByText('Ratings & Trends')).toBeTruthy()
  //   Object.values(headers).forEach((value) => {
  //     expect(screen.getByText(value.header)).toBeTruthy()
  //   })
  // })

  // check for footer details

  // check for true measure data output
})
