import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import { submeasureResults } from '../../../components/Utilities/RatingTrendsValues';
import { ratingTrendsTip, submeasureTips } from '../../../components/Utilities/RatingTrendValuesUtil'
import RatingTrends from '../../../components/Summary/RatingTrends';
import {
  activeSubmeasure, trendList, currentResults,
} from '../../data/DemoData';

describe('RatingTrends', () => {
  beforeEach(() => {
    render(
      <RatingTrends
        currentResults={currentResults}
        activeMeasure={activeSubmeasure}
        trends={trendList}
      />,
    );
  });

  // we can expect eight headers in the current version because only
  // the main title, four box headers, and three percentages are
  // guaranteed to be shown
  it('headers render', () => {
    const headers = screen.getAllByRole('heading');
    expect(headers.length).toBe(8);
  });

  // tooltips, we need specific ones for measure view
  // star, percentage, lo, hi
  it('tooltips render', () => {
    const helpIcons = screen.getAllByTestId('HelpIcon');
    expect(helpIcons.length).toBe(4);
    submeasureTips.forEach((tip) => {
      expect(screen.getByLabelText(tip)).toBeTruthy()
    })
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'info-button' }));
    expect(screen.getByText(ratingTrendsTip)).toBeTruthy();
  });

  // main header info pop out button
  it('buttons render', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(1);
  });

  // there is only one star rating displayed for submOrderedArr currently
  it('star ratings render', () => {
    const starRatings = screen.getAllByRole('img');
    expect(starRatings.length).toBe(1);
  });

  // check for info button and info header
  it('widget headers have correct information', () => {
    expect(screen.getByText('Ratings & Trends')).toBeTruthy();

    // help pop up
    const starLabel = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';
    const percentLabel = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.';

    // this function returns measure star rating, percentage rating, and submeasure hi/low
    const submOrderedArr = submeasureResults(activeSubmeasure, trendList)

    Object.values(submOrderedArr).forEach((rating) => {
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
    const submOrderedArr = submeasureResults(activeSubmeasure, trendList)

    const allLabels = {}
    Object.values(submOrderedArr).forEach((rating) => {
      if (allLabels[rating.measure] === undefined) {
        allLabels[rating.measure] = 0
      }
      allLabels[rating.measure] += 1
    });

    Object.values(submOrderedArr).forEach((rating, idx) => {
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
    const submOrderedArr = submeasureResults(activeSubmeasure, trendList)

    // now we need to check if they rendered
    Object.values(submOrderedArr).forEach((rating, idx) => {
      const footers = screen
        .getAllByText((content, element) => content.startsWith(rating.measure.toUpperCase()));
      // we can always expect the main submeasure to have two footers: star/percent
      if (idx < 3) {
        expect(footers.length === 2)
      }
      // otherwise we expect individual submeasure rated high and low
      expect(footers.length === 1)
    })
  });
});
