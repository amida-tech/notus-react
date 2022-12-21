import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OverviewTable from '../../../components/DisplayTable/OverviewTable';
import {
  resultList, headerInfo, colorMap, currentResults,
} from '../../data/DemoData';

describe('Dashboard: DisplayTable: Overview', () => {
  // Display Table
  const mockHandleSelectedMeasureChange = jest.fn(() => false);
  const activeMeasure = resultList[0]

  beforeEach(() => {
    render(
      <BrowserRouter>
        <OverviewTable
          activeMeasure={activeMeasure}
          headerInfo={headerInfo}
          currentResults={currentResults}
          colorMap={colorMap}
          handleSelectedMeasureChange={mockHandleSelectedMeasureChange}
        />
      </BrowserRouter>,
    )
    // Below code assists with MUI loading states
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })

  it('buttons render', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(6)
  })

  it('checkboxes render', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(11)
    // save for later
    // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
  })

  it('headers and their tooltips render', () => {
    Object.values(headerInfo).forEach((value) => {
      expect(screen.getByText(value.header)).toBeTruthy()
      fireEvent.mouseOver(screen.getByText(value.header))
      expect(screen.getByLabelText(value.tooltip)).toBeTruthy()
    })
  })

  it('measure data renders', () => {
    Object.values(currentResults.slice(0, 2)).forEach((row, i) => {
      const currentRow = screen.getAllByRole('row', { selected: true })[i]
      const inclusions = Number(row.initialPopulation) - Number(row.exclusions)
      const columnValues = {
        'Remaining Inclusions': inclusions,
        'Eligible Population': row.initialPopulation,
        Numerator: row.numerator,
        Denominator: row.denominator,
        'Available Exclusions': row.exclusions,
      }
      Object.entries(columnValues).forEach(([key, value], idx) => {
        const columnHeader = within(currentRow).getAllByRole('cell')[idx + 2]
        expect(
          within(columnHeader).getByText(value),
        ).toBeTruthy()
      })
    })
  })
})
