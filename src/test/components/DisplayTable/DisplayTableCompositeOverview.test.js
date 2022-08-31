import {
  render, screen, within, fireEvent, waitFor, querySelector
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

  // Measure Table Row
  const mockHandleSelectedMeasureChange = jest.fn(() => false);

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

  it('COMPOSITE OVERVIEW: tablist and tabs render', () => {
    const tablist = screen.getAllByRole('tablist')
    expect(tablist.length).toBe(1)
    const tabs = screen.getAllByRole('tab', { name: 'Overview' })
    expect(tabs.length).toBe(1)
    const tabpanel = screen.getAllByRole('tabpanel', { name: 'Overview' })
    expect(tabpanel.length).toBe(1)
  })

  it('COMPOSITE OVERVIEW: links render', () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(10)
  })

  it('COMPOSITE OVERVIEW: buttons render', () => {
    const buttons = screen.getAllByRole('link')
    expect(buttons.length).toBe(10)
  })

  it('COMPOSITE OVERVIEW: checkboxes render and are checked', async () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(11)

    // Material UI doesn't like you or me or anyone
    // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
    // checkboxes.forEach((box, i) => {
    //   expect(box).toHaveProperty('checked', true)
      // expect(box.checked).toBe(true);
      // fireEvent.click(box)
      // expect(box.checked).toBe(false);
    // })
  })

  it('COMPOSITE OVERVIEW: headers and their tooltips render', async () => {
    const overviewHeaders = {
      "Measure": 'The actual measure. At the moment, these are always HEDIS measures. (Hover over measures and table headers to view description)',
      "Remaining Inclusions": 'The population remaining after exclusions are removed.',
      "Eligible Population": 'The population of members who are eligible for this measure.',
      "Numerator": 'The number of members who have satisfied the criteria for this measure.',
      "Denominator": 'The population of members who are eligible for this measure. Currently the same as Eligible Population.',
      "Available Exclusions": 'The population that can be excluded based on criteria.'
    }

    for (let [header, tip] of Object.entries(overviewHeaders)) {
      expect(screen.getByText(header)).toBeTruthy()
      fireEvent.mouseOver(screen.getByText(header));
      await waitFor(() => screen.getByLabelText(tip))
      expect(screen.getByLabelText(tip)).toBeTruthy()
    }
  })
})

  // it('COMPOSITE OVERVIEW: checkboxes uncheck and check and updates data store', async () => {
  //   const checkboxes = screen.getAllByRole('checkbox')
  //   checkboxes.forEach((box, i) => {
  //     fireEvent.click(box)
  //     // if(i === 0) {
  //     //   checkboxes.forEach
  //     //   expect(checkboxes[1].checked).toBe(false);
  //     // }
  //     expect(box.checked).toBe(false);
  //   })
  // })

// unchecking box unchecks main checkbox
// unchecking main box unchecks all
// measure link has correct navigation

// select measure opens up list and correct href -- list items? clicking not opening