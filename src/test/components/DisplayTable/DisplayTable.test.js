import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DisplayTableContainer from '../../../components/DisplayTable/DisplayTableContainer'
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import MeasureTableRow from '../../../components/DisplayTable/MeasureTableRow'
import {
  resultList, headerInfo, selectedMeasures, colorMap, currentResults
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

describe('Dashboard: DisplayTable component', () => {
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
    // Please keep this for when we move the loading state to the Display
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))

  })

  it('Checkboxes render', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    screen.debug()
  })
})