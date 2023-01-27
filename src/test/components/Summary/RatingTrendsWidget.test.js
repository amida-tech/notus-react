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
    const helpIcons = screen.getAllByTestId('HelpIcon')
    expect(helpIcons.length).toBe(4)
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

    // default props in store for dev mode
    const defaultStoreHeaders = {
      'aab': 'star',
      'asfe': 'percent',
      'uri': 'star',
      'Composite': 'percent',
    }
    // help pop up
    const starLabel = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.'
    const percentLabel = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'

    Object.entries(defaultStoreHeaders).forEach(([header, type]) => {
      if (type === 'star') {
        const starEl = screen.getByText(`${header.toUpperCase()} Star Rating`)
        expect(starEl).toBeTruthy()
        const starSvg = within(starEl).getByLabelText(starLabel)
        expect(starSvg).toBeTruthy()
      } else if (type === 'percent') {
        const percentEl = screen.getByText(`${header.toUpperCase()} Score % Change`)
        expect(percentEl).toBeTruthy()
        const percentSvg = within(percentEl).getByLabelText(percentLabel)
        expect(percentSvg).toBeTruthy()
      } else {
        return false;
      }
    })
  })

  it('widget details have correct information', () => {
    const defaultStoreHeaders = {
      'aab': 'star',
      'asfe': 0,
      'uri': 'star',
      'Composite': 0,
    }

    Object.entries(defaultStoreHeaders).forEach(([header, type], idx) => {
      if (type === 'star') {
        screen.debug()
        const starDetails = screen.getAllByTestId('StarBorderIcon')
        expect(within(starDetails[idx])).toBeTruthy()
      } else if (type === 'percent') {
        const percentDetails = screen.getAllByText(`+ ${percentValue}`)
        expect(within(percentDetails[idx])).toBeTruthy()
      } else {
        return false;
      }
    })
  })

  it('widget footer have correct information', () => {
    Object.entries(defaultStoreHeaders).forEach(([header, type]) => {
      if (type === 'star') {
        const starFooter = screen.getByText('(over the past week)')
        expect(starFooter).toBeTruthy()
      } else if (type === 'percent') {
        const percentFooter = screen.getByText(header.toUpperCase())
        expect(percentFooter).toBeTruthy()
      } else {
        return false;
      }
    })
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

// screen.debug()
