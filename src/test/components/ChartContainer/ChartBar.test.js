import {
  render, screen, fireEvent, within,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';
import theme from '../../../assets/styles/AppTheme';
import ChartBar from '../../../components/Chart/ChartBar';

describe('D3 Container: Chart bar', () => {
  const filterDrawerOpen = false;
  const mockToggleFilterDrawer = jest.fn(() => false);
  const filterSum = 0;
  const currentTimeline = {
    choice: 'all',
    range: [
      null,
      null,
    ],
  };
  const mockHandleTimelineChange = jest.fn(() => false);
  const filterDisabled = false;

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <ChartBar
          filterDrawerOpen={filterDrawerOpen}
          toggleFilterDrawer={mockToggleFilterDrawer}
          filterSum={filterSum}
          currentTimeline={currentTimeline}
          handleTimelineChange={mockHandleTimelineChange}
          filterDisabled={filterDisabled}
        >
          <LocalizationProvider
            dateAdapter={AdapterMoment}
          />
        </ChartBar>
      </ThemeProvider>,
    );
  });

  it('Composite: Timeline and filter buttons render', () => {
    const buttonLabels = ['Timeline: All', 'Filter'];

    buttonLabels.forEach((label, i) => {
      const button = screen.getAllByRole('button')[i];
      expect(button.textContent).toBe(label);
    });
  });

  it('Timeline button shows timeline options and updates', () => {
    const timelineOptions = {
      'All Available': 'All',
      'Last 30 Days': '30 Days',
      'Last 60 Days': '60 Days',
      'Last 90 Days': '90 Days',
      'Year to Date': 'YTD Days',
    };

    Object.keys(timelineOptions).forEach((key) => {
      const timelineBtn = screen.getByRole('button', { name: 'Timeline: All' });
      fireEvent.click(timelineBtn);
      const dropdownMenu = screen.getByRole('menu');
      expect(within(dropdownMenu).getByText(key)).toBeTruthy();
      fireEvent.click(within(dropdownMenu).getByText(key));
      expect(mockHandleTimelineChange).toHaveBeenCalled();
    });
  });

  it('Filter button shows proper options', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(mockToggleFilterDrawer).toHaveBeenCalled();
  });
});
