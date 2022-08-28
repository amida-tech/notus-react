import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import {
  exportUrl, memberId, memberInfo, rowData,
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

describe('Dashboard: DisplayTable component', () => {
  beforeEach(() => {
    render(
      <DisplayTable
        headerInfo=""
        pageSize=""
        useCheckBox=""
        selectedRows=""
        handleCheckBoxChange=""
        children=""
      />
    )
    // Please keep this for when we move the loading state to the Display
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })
})