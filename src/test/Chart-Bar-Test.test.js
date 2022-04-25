import React from 'react';
import { render, screen } from '@testing-library/react';
import { Try } from '@mui/icons-material';
import ChartBar from '../components/ChartContainer/ChartBar';

const defaultFilterState = {
  domainsOfCare: [],
  stars: [],
  percentRange: [0, 100],
  sum: 1,
}
const defaultTimelineState = {
  choice: '60', // 30, 60, ytd or custom.
  range: [null, null],
}
const filterDrawerOpen = false
const toggleFilterDrawer = undefined

const handleTimelineChange = undefined
// describe('ChartBar Rendering', () => {
test('Chart Bar renders to screen', () => {

    render(<ChartBar
      filterDrawerOpen={filterDrawerOpen}
      toggleFilterDrawer={toggleFilterDrawer}
      filterSum={defaultFilterState.sum}
      currentTimeline={defaultTimelineState}
      handleTimelineChange={handleTimelineChange}
    />)

})
test('Chart Bar renders "TimeLine"', async () => {

    render(<ChartBar
      filterDrawerOpen={filterDrawerOpen}
      toggleFilterDrawer={toggleFilterDrawer}
      filterSum={defaultFilterState.sum}
      currentTimeline={defaultTimelineState}
      handleTimelineChange={handleTimelineChange}
    />)

    const linkElement = await screen.queryByText(/Timeline/i)
    expect(linkElement).toBeInTheDocument();
  
})
// })
