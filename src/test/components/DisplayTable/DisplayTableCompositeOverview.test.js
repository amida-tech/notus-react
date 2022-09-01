import {
  render, screen, within, fireEvent, waitFor
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DisplayTableContainer from '../../../components/DisplayTable/DisplayTableContainer'
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import {
  resultList, headerInfo, selectedMeasures, colorMap, currentResults
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

describe('Dashboard: DisplayTable: Composite Overview', () => {
  // Display Table Container
  const mockHandleMeasureChange = jest.fn(() => false);
  const mockHandleTableFilterChange = jest.fn(() => false);
  const mockSetTableFilter = jest.fn(() => false);
  const mockHandleTabChange = jest.fn(() => false);

  // Display Table
  const selectedRows = []
  const mockHandleCheckBoxChange = jest.fn(() => false);

  const activeMeasure = resultList[0]
  const tabValue = 'overview'
  const isComposite = true
  const tableFilter = []
  const rowEntries = []

  beforeEach( () => {
    render(
      <BrowserRouter>
        <DisplayTableContainer
          activeMeasure={activeMeasure}
          store={datastore}
          tabValue={tabValue}
          isComposite={isComposite}
          headerInfo={headerInfo}
          selectedMeasures={selectedMeasures}
          currentResults={currentResults}
          colorMap={colorMap}
          tableFilter={tableFilter}
          rowEntries={rowEntries}
          handleTableFilterChange={mockHandleTableFilterChange}
          handleSelectedMeasureChange={mockHandleMeasureChange}
          setTableFilter={mockSetTableFilter}
          handleTabChange={mockHandleTabChange}
        >
          <DisplayTable
            headerInfo={headerInfo}
            pageSize={5}
            useCheckBox
            selectedRows={selectedRows}
            handleCheckBoxChange={mockHandleCheckBoxChange}
          >
          </DisplayTable>
        </DisplayTableContainer>
      </BrowserRouter>
    )
    // The below code assists in loading states that aren't obviously controlled with a loading prop
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })

  it('tablist and tabs render', () => {
    const tablist = screen.getAllByRole('tablist')
    const tabs = screen.getAllByRole('tab')
    const tabpanel = screen.getAllByRole('tabpanel')

    if (activeMeasure.measure === 'composite') {
      expect(tablist.length).toBe(1)
      expect(tabs.length).toBe(1)
      expect(tabpanel.length).toBe(1)
    } else {
      expect(tablist.length).toBe(1)
      expect(tabs.length).toBe(2)
      expect(tabpanel.length).toBe(2)
    }
  })

  it('links render', () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(10)
  })

  it('buttons render', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('checkboxes render', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(11)
    // save for later
    // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
  })

  it('headers and their tooltips render', async () => {
    for (let value of Object.values(headerInfo)) {
      expect(screen.getByText(value.header)).toBeTruthy()
      fireEvent.mouseOver(screen.getByText(value.header));
      await waitFor(() => screen.getByLabelText(value.tooltip))
      expect(screen.getByLabelText(value.tooltip)).toBeTruthy()
    }
  })

  it('measure links have correct href', () => {
    const links = screen.getAllByRole('link')
    links.forEach((link, i) => {
      const location = link.href.split('/').pop()
      expect(location).toBe(selectedMeasures[i])
    })
  })

  it('measure data renders', () => {
    Object.values(currentResults.slice(0,9)).map((value) => {
      const currentRow = screen.getByLabelText(`${value.measure} row`)
      const inclusions = parseInt(value.initialPopulation) - parseInt(value.exclusions)
      const columnValues = {
        'Remaining Inclusions': inclusions,
        'Eligible Population': value.initialPopulation,
        'Numerator': value.numerator,
        'Denominator': value.denominator,
        'Available Exclusions': value.exclusions
      }
      for (let [key, value] of Object.entries(columnValues)) {
        const columnHeader = within(currentRow).getByLabelText(key)
        expect(
          within(columnHeader).getByText(value)
        ).toBeTruthy()
      }
    })
  })
})

// select measure opens up list and correct href -- list items? clicking not opening -- I blame MUI
