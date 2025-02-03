import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import Dashboard from 'layouts/Dashboard';
import axios from 'axios';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import { mockTrendPromise } from 'test/resources';
import { mockLegacySearchPromise } from 'test/resources';
import { mockInfoPromise } from 'test/resources';
import { mockPayorsPromise } from 'test/resources';
import { mockHealthcareCoveragesPromise } from 'test/resources';
import { mockHealthcareProvidersPromise } from 'test/resources';
import { mockPractitionersPromise } from 'test/resources';
import { createMemoryHistory } from 'history';
import DatastoreProviderWrapper from 'context/DatastoreProviderWrapper';
import { ThemeProvider } from '@emotion/react';
import theme from '../../assets/styles/AppTheme';
import '@testing-library/jest-dom';

jest.mock('axios');
process.env.REACT_APP_DEV_DATA = true;

// Mock the axios.get function for URLs that include certain strings
axios.get.mockImplementation((url) => {
  switch (url) {
    // trendPromise: measures/trends?legacyResults=
    case url.includes('measures/trends?legacyResults='):
      return Promise.resolve(mockTrendPromise);
    // searchPromise - legacy results : measures/searchResults
    case url.includes('measures/searchResults'):
      return Promise.resolve(mockLegacySearchPromise);
    // searchPromise - results : measures/dailyMeasureResults
    case url.includes('measures/dailyMeasureResults'):
      return Promise.resolve({});
    // infoPromise : measures/info
    case url.includes('measures/info'):
      return Promise.resolve(mockInfoPromise);
    // payorsPromise : payors
    case url.includes('payors'):
      return Promise.resolve(mockPayorsPromise);
    // healthcareProvidersPromise : healthcareproviders
    case url.includes('healthcareproviders'):
      return Promise.resolve(mockHealthcareProvidersPromise);
    // healthcareCoveragesPromise : healthcarecoverages
    case url.includes('healthcarecoverages'):
      return Promise.resolve(mockHealthcareCoveragesPromise);
    // practitionersPromise : practitioners
    case url.includes('practitioners'):
      return Promise.resolve(mockPractitionersPromise);
    // url does not match
    default:
      return Promise.resolve({});
  }
});

describe('The Dashboard component', () => {
  it('renders as expected', async () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);
    // Render the main App (login page)
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route history={history}>
            <DatastoreProviderWrapper>
              <Dashboard />
            </DatastoreProviderWrapper>
          </Route>
        </BrowserRouter>
      </ThemeProvider>,
    );
    // Define, assert existence, and click the filter menu button
    const filterMenuBtn = screen.getByText(/filter/i);
    await waitFor(() => {
      expect(filterMenuBtn).toBeInTheDocument();
    });
    fireEvent.click(filterMenuBtn);

    // Define, assert existence, and click the reset filters button
    const resetFiltersBtn = screen.getByText(/Reset Filters/i);
    await waitFor(() => {
      expect(resetFiltersBtn).toBeInTheDocument();
    });
    fireEvent.click(resetFiltersBtn);

    // Assert that the menu closed & the button is no longer exists
    await waitFor(() => {
      expect(screen.queryByText(/Reset Filters/i)).toBeNull();
    });

    screen.debug(undefined, 40000);
  });
});
