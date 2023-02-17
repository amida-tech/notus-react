import {
  render, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  activeSubmeasure, trendList, currentResults,
} from '../../data/DemoData';
import Dashboard from 'layouts/Dashboard';

describe('RatingTrends', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Dashboard
        />
      </BrowserRouter>
    );
  });


  // check for info button and info header
  it('failure to connect alert does display', () => {
    // expert alert to display
  });

  it('failure to connect alert does not display', () => {
    // expert alert to not display
  });
});
