import {
  render, screen, within,
} from '@testing-library/react';
import RatingTrends from '../../../components/Summary/RatingTrends';
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
      />,
    );
  });

  // Percentages are output as headers, so we need 2 plus the regular headers
  it('headers render', () => {
    const headers = screen.getAllByRole('heading');
    expect(headers.length).toBe(7);
    const helpIcons = screen.getAllByTestId('HelpIcon');
    expect(helpIcons.length).toBe(4);
  });

  // Info button plus four draggable components that render as buttons
  it('buttons render', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  // Star ratings details output as img tags, so we need 2
  it('star ratings render', () => {
    const starRatings = screen.getAllByRole('img');
    expect(starRatings.length).toBe(2);
  });

  // check for info button and info header
  it('widget headers have correct information', () => {
    expect(screen.getByText('Ratings & Trends')).toBeTruthy();

    // default props in store for dev mode
    // help pop up
    const starLabel = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';
    const percentLabel = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.';

    Object.values(widgetPrefs).forEach((rating) => {
      if (rating.type === 'star') {
        const starEl = screen.getByText(`${rating.measure.toUpperCase()} Star Rating`);
        expect(starEl).toBeTruthy();
        const starSvg = within(starEl).getByLabelText(starLabel);
        expect(starSvg).toBeTruthy();
      } else if (rating.type === 'percent') {
        const percentEl = screen.getByText(`${rating.measure.toUpperCase()} Score % Change`);
        expect(percentEl).toBeTruthy();
        const percentSvg = within(percentEl).getByLabelText(percentLabel);
        expect(percentSvg).toBeTruthy();
      }
      return false;
    });
  });

  it('widget details have correct information', () => {
    let allLabels = {}
    Object.values(widgetPrefs).forEach((rating) => {
      if (allLabels[rating.measure] === undefined) {  
        allLabels[rating.measure] = 0
      }
      allLabels[rating.measure] += 1
    });

    Object.values(widgetPrefs).forEach((rating, idx) => {
      if (rating.type === 'star') {
        const starDetails = screen.getAllByLabelText(rating.measure);
        expect(starDetails[idx % allLabels[rating.measure]].ariaLabel === rating.measure)
      } else if (rating.type === 'percentage') { 
        const percentDetails = screen.getAllByLabelText(rating.measure);
        expect(percentDetails[idx % allLabels[rating.measure]].ariaLabel === rating.measure)
      }
      return false;
    });
  });

  it('widget footers have correct information', () => {
    Object.values(widgetPrefs).forEach(rating => {
      const starFooters = screen
        .getAllByText(`(${rating.measure.toUpperCase()} over the past week)`);
      expect(starFooters).toBeTruthy()
    })
  });
});
