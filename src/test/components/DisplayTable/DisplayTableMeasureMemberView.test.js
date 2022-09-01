import {
  render, screen, within, fireEvent, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DisplayTableContainer from '../../../components/DisplayTable/DisplayTableContainer'
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import {
  resultList, aabHeaderInfo, selectedMeasures, colorMap, currentResults, rowEntries,
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

describe('Dashboard: DisplayTable: AAB Member View', () => {
  // Display Table Container
  const mockHandleMeasureChange = jest.fn(() => false);
  const mockHandleTableFilterChange = jest.fn(() => false);
  const mockSetTableFilter = jest.fn(() => false);
  const mockHandleTabChange = jest.fn(() => false);

  // Display Table
  const mockHandleCheckBoxChange = jest.fn(() => false);

  const tableFilter = []

  beforeEach(() => {
    render(
      <BrowserRouter>
        <DisplayTableContainer
          activeMeasure={resultList[1]}
          store={datastore}
          tabValue="members"
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
          />
        </DisplayTableContainer>
      </BrowserRouter>,
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
  })

  it('links render', () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(10)
  })

  it('buttons render', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(3)
  })

  it('checkboxes render', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(3)

    // Material UI doesn't like you or me or anyone, saving for later
    // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
  })

  it('headers and their tooltips render', async () => {
    for (const value of Object.values(aabHeaderInfo)) {
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
      expect(location).toBe(rowEntries[i].value)
    })
  })

  it('measure data renders', () => {
    const stringToBool = (str) => (str.split('').length > 5 ? str : JSON.parse(str))

    // CHECKING EACH ROW
    Object.values(rowEntries.slice(0, 9)).forEach((row) => {
      const columnValues = {}

      // CHECKING HEADERS AND WHAT EXPECTED VALUES ARE IN THEM -- COMPARE TO THIS OBJECT
      Object.values(aabHeaderInfo).forEach((column) => {
        const headerVal = column.header
        columnValues[`${headerVal}`] = headerVal === 'MemberID' ? row.value : row[headerVal.toLowerCase()]
      })

      // GRABBING THE ACTUAL ROW
      const currentRow = screen.getByLabelText(`${row.value} row`)

      // FOR EACH COLUMN, LET US CHECK THE RENDERED VALUE VERSUS EXPECTED
      for (const [key, value] of Object.entries(columnValues)) {
        // GRAB THE COLUMN
        const columnHeader = within(currentRow).getByLabelText(`${key} column`)

        const newValue = stringToBool(value)

        if (typeof newValue === 'string') {
          expect(
            within(columnHeader).getByText(newValue),
          ).toBeTruthy()
        } else if (newValue === true) {
          expect(
            within(columnHeader).getByText('Matched'),
          ).toBeTruthy()
        } else {
          expect(
            within(columnHeader).getByText('Unmatched'),
          ).toBeTruthy()
        }
      }
    })
  })
})
