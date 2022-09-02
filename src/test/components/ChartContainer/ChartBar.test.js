import {
  render, screen, fireEvent, within
} from '@testing-library/react';
import ChartBar from '../../../components/ChartContainer/ChartBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../assets/styles/AppTheme'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment'

describe('D3 Container: Chart bar', () => {
  const filterDrawerOpen = false
  const toggleFilterDrawer = jest.fn(() => false)
  const filterSum = 0
  const currentTimeline = {
    "choice": "all",
    "range": [
        null,
        null
    ]
  }
  const handleTimelineChange = jest.fn(() => false)
  const filterDisabled = false

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <ChartBar
          filterDrawerOpen={filterDrawerOpen}
          toggleFilterDrawer={toggleFilterDrawer}
          filterSum={filterSum}
          currentTimeline={currentTimeline}
          handleTimelineChange={handleTimelineChange}
          filterDisabled={filterDisabled}
        >
          <LocalizationProvider
            dateAdapter={AdapterMoment}
          >

          </LocalizationProvider>
        </ChartBar>
      </ThemeProvider>
    )
  })

  it('Composite: Timeline and filter buttons render', () => {
    const buttonLabels = ['Timeline: All', 'Filter']

    buttonLabels.forEach((label, i) => {
      const button = screen.getAllByRole('button')[i]
      expect(button.textContent).toBe(label)
    }) 
  })

  it('Timeline button shows timeline options and updates', () => {
    const timelineOptions = {
      'All Available': 'All',
      'Last 30 Days': '30 Days',
      // 'Last 60 Days': '60 Days',
      // 'Last 90 Days': '90 Days',
      // 'Year to Date': 'YTD Days'
    }

    Object.entries(timelineOptions).forEach(([key, value]) => {
      const timelineBtn = screen.getByRole('button', { name: `Timeline: All` })
      fireEvent.click(timelineBtn)
      const dropdownMenu = screen.getByRole('menu')
      expect(within(dropdownMenu).getByText(key)).toBeTruthy()
      fireEvent.click(within(dropdownMenu).getByText(key))
    })
  })
})
