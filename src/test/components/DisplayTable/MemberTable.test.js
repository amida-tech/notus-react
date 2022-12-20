import {
  render, screen, within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MemberTable from '../../../components/DisplayTable/MemberTable';
import {
  resultList, aabHeaderInfo, rowEntries,
} from '../../data/DemoData';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val))

describe('MemberTable: AAB', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <MemberTable
          activeMeasure={resultList[1]}
          headerInfo={aabHeaderInfo}
          rowEntries={rowEntries}
        />
      </BrowserRouter>,
    )
  })

  it('links render', () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
  })

  it('buttons render', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(3)
  })

  it('checkboxes render', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(5)
  })

  //   // Material UI doesn't like you or me or anyone, saving for later
  //   // https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library
  // })

  it('headers and their tooltips render', () => {
    Object.values(aabHeaderInfo).forEach((value) => {
      expect(screen.getByText(value.header)).toBeTruthy()
    })
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

      // ROW EXAMPLE
      // {
      //   value: 'aab-2b6fa31b-c5da-4579-97ad-f2ff0c1962c7',
      //   label: 'aab-2b6fa31b-c5da-4579-97ad-f2ff0c1962c7',
      //   type: 'member',
      //   aab: 'true'
      // }

      // CHECKING HEADERS AND WHAT EXPECTED VALUES ARE IN THEM -- COMPARE TO THIS OBJECT
      Object.values(aabHeaderInfo).forEach((column) => {
        const headerVal = column.header
        columnValues[`${headerVal}`] = headerVal === 'MemberID' ? row.value : row[headerVal.toLowerCase()]
      })

      // COLUMN EXAMPLE
      // {
      //   key: 'aab',
      //   link: false,
      //   header: 'AAB',
      //   tooltip: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
      //   flexBasis: 'medium'
      // }

      // GRABBING THE ACTUAL ROW
      const currentRow = screen.getByLabelText(row.value)

      // FOR EACH COLUMN, LET US CHECK THE RENDERED VALUE VERSUS EXPECTED
      Object.values(columnValues).forEach((value) => {
        const newValue = stringToBool(value)

        if (typeof newValue === 'string') {
          expect(
            within(currentRow).getByText(newValue),
          ).toBeTruthy()
        } else if (newValue === true) {
          expect(
            within(currentRow).getByText('Matched'),
          ).toBeTruthy()
        } else {
          expect(
            within(currentRow).getByText('Unmatched'),
          ).toBeTruthy()
        }
      })
    })
  })
})
