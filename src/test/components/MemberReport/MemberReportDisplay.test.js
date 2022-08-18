import {
  waitForElementToBeRemoved, getByText, fireEvent, render, screen, cleanup, queryByAttribute,
} from '@testing-library/react'

import { DatastoreContext } from 'context/DatastoreProvider';
import MemberReport from '../../../layouts/MemberReport'
import MemberReportDisplay from '../../../components/MemberReport/MemberReportDisplay'
import { DatastoreReducer } from '../../../context/DatastoreReducer';
import { resultList, infoObject, memberId, memberInfo } from '../../data/DemoData';
import { exportUrl, description, rowData, coverageStatus } from '../../data/MemberReport'

describe('Member view page', () => {
  const mockInitState = {
    results: [],
    trends: [],
    currentResults: [],
    info: {},
    lastUpdated: 'Updating now...',
  }
  const datastore = DatastoreReducer(mockInitState, { type: 'SET_RESULTS', payload: { results: resultList, info: infoObject } })
  const mockFunc = jest.fn(() => console.info('I was clicked'))

  beforeEach(async () => {
    const container = render(
      <DatastoreContext.Provider value={{ datastore }}>
        <MemberReport
          id={memberId}
        >
          <MemberReportDisplay
            id={memberId}
            memberInfo={memberInfo}
            datastoreInfo={datastore.info}
            exportUrl={exportUrl}
            coverageStatus={coverageStatus}
            rowData={rowData}
            description={description}
          />
        </MemberReport>
      </DatastoreContext.Provider>,
    )
    await waitForElementToBeRemoved(() => container.getByTestId('loading'))

    // Please keep this for when we move the loading state to the Display
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))

  })

  afterEach(async () => {
    cleanup
  })

  it('Headings render', () => {
    expect(screen.getAllByRole('heading').length).toBe(4)
    expect(screen.getByRole('heading', { name: "Reporting - Member's Data" })).not.toBeNull()
    expect(screen.getByRole('heading', { name: 'General Information' })).not.toBeNull()
    expect(screen.getByRole('heading', { name: 'Measure Analysis' })).not.toBeNull()
    expect(screen.getByRole('heading', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).not.toBeNull()
  })

  it('Buttons render', () => {
    expect(screen.getAllByRole('button').length).toBe(4)
    expect(screen.getByRole('button', { name: 'Export' })).not.toBeNull()
    expect(screen.getByRole('button', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).not.toBeNull()
    expect(screen.getAllByLabelText('info-button').length).toBe(2)
  })

  it('Buttons are clickable', () => {
    const infoBtnArry = screen.getAllByLabelText('info-button')
    // fireEvent.click(infoBtnArry[0]);
    // screen.debug()
  })

  // clicking buttons does their function more or less

  it('Links render', () => {
    expect(screen.getAllByRole('link').length).toBe(1)
    expect(screen.getByRole('link', { name: 'Export' })).not.toBeNull()
  })

  // it('Export link clicks', () => {
  //   const exportBtn = screen.getByRole('link', { name: 'Export' })
  //   fireEvent.click(exportBtn);
  // })

  // clicking export does a thing

  // export button exists, is clickable
  // general info pop up has information
  // general information has all the necessary information
  // member id, dob, age, gender, coverage status, participation period
  // policy id, payor, plan, dependents, relationship, type, participation period
  // measure analysis pop up has information
  // measure analysis drop down renders
  // measure analysis has all the necessary information
  // measure, type, status, exclusions, practitioner, dates, conditions, and recommendations render
})
