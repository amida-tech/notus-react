import {
  render, screen, within, fireEvent, waitForElementToBeRemoved
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DisplayTableContainer from '../../../components/DisplayTable/DisplayTableContainer'
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import {
  resultList, aabHeaderInfo, selectedMeasures, colorMap, currentResults, rowEntries
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

describe('Dashboard: DisplayTable: AAB Member View', () => {
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

  let tableFilter = []

  beforeEach( async () => {
    render(
      <BrowserRouter>
        <DisplayTableContainer
          activeMeasure={resultList[1]}
          store={datastore}
          tabValue={'members'}
          isComposite={false}
          headerInfo={aabHeaderInfo}
          selectedMeasures={[selectedMeasures[1]]}
          currentResults={[currentResults[1]]}
          colorMap={[colorMap[1]]}
          tableFilter={tableFilter}
          rowEntries={rowEntries}
          handleTableFilterChange={mockHandleTableFilterChange}
          handleSelectedMeasureChange={mockHandleMeasureChange}
          setTableFilter={mockSetTableFilter}
          handleTabChange={mockHandleTabChange}
        >
          <DisplayTable
            headerInfo={aabHeaderInfo}
            pageSize={5}
            useCheckBox
            selectedRows={[]}
            handleCheckBoxChange={mockHandleCheckBoxChange}
          >
          </DisplayTable>
        </DisplayTableContainer>
      </BrowserRouter>
    )

    const memberTab = screen.getByRole('tab', { name: 'Members' });
    fireEvent.click(memberTab)

    // The below code assists in loading states that aren't obviously controlled with a loading prop
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })

  it('tablist and tabs render', () => {
    const tablist = screen.getAllByRole('tablist')
    const tabs = screen.getAllByRole('tab')
    const tabpanel = screen.getAllByRole('tabpanel')

    expect(tablist.length).toBe(1)
    expect(tabs.length).toBe(2)
    expect(tabpanel.length).toBe(1)

    screen.debug()
  })

  // link true key label rowDataItem {
  //   value: 'aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
  //   label: 'aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
  //   type: 'member',
  //   aab: 'false'
  // } ciseCheck member

  // MeasureTableRow props

  // link true key label rowDataItem {
  // value: 'aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
  // label: 'aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
  // type: 'member', aab: 'false'}
  // aab: "false"
  // } ciseCheck member

  // it('links render', () => {
  //   const links = screen.getAllByRole('link')
  //   expect(links.length).toBe(10)
  // })

  // it('buttons render', () => {
  //   const buttons = screen.getAllByRole('button')
  //   expect(buttons.length).toBe(3)
  // })

  // it('checkboxes render', () => {
  //   const checkboxes = screen.getAllByRole('checkbox')
  //   expect(checkboxes.length).toBe(3)

    // Material UI doesn't like you or me or anyone, saving for later
    // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
  // })

  // it('headers and their tooltips render', async () => {
  //   for (let [key, value] of Object.entries(headerInfo)) {
  //     expect(screen.getByText(value.header)).toBeTruthy()
  //     fireEvent.mouseOver(screen.getByText(value.header));
  //     await waitFor(() => screen.getByLabelText(value.tooltip))
  //     expect(screen.getByLabelText(value.tooltip)).toBeTruthy()
  //   }
  // })

  // it('measure links have correct href', () => {
  //   const links = screen.getAllByRole('link')
  //   links.forEach((link, i) => {
  //     const location = link.href.split('/').pop()
  //     expect(location).toBe(selectedMeasures[i])
  //   })
  // })

  // it('measure data renders', () => {
  //   Object.values(currentResults.slice(0,9)).map((value) => {
  //     const currentRow = screen.getByLabelText(`${value.measure} row`)
  //     const inclusions = parseInt(value.initialPopulation) - parseInt(value.exclusions)
  //     const columnValues = {
  //       'Remaining Inclusions': inclusions,
  //       'Eligible Population': value.initialPopulation,
  //       'Numerator': value.numerator,
  //       'Denominator': value.denominator,
  //       'Available Exclusions': value.exclusions
  //     }
  //     for (let [key, value] of Object.entries(columnValues)) {
  //       const columnHeader = within(currentRow).getByLabelText(key)
  //       expect(
  //         within(columnHeader).getByText(value)
  //       ).toBeTruthy()
  //     }
  //   })
  // })
})

// select measure opens up list and correct href -- list items? clicking not opening -- I blame MUI
