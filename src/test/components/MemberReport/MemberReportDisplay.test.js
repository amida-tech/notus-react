import {
  waitFor, waitForElementToBeRemoved, getByText, fireEvent, mount,
  render, screen, cleanup, queryByAttribute, within, toHaveBeenCalled, toHaveAttribute
} from '@testing-library/react'
import { getAge, getDatestamp, updateTimestamp } from '../../../components/Utilities/GeneralUtil'
import MemberReportDisplay from '../../../components/MemberReport/MemberReportDisplay'
import {
  memberId, memberInfo, datastore, exportUrl, rowData, coverage,
} from '../../data/DemoData';

describe('Member view page', () => {
  beforeEach(async () => {
    render(
      <MemberReportDisplay
        id={memberId}
        memberInfo={memberInfo}
        datastoreInfo={datastore.info}
        exportUrl={exportUrl}
        coverage={coverage}
        coverageStatus="active"
        rowData={rowData}
        description={datastore.info.aab.description}
      />
    )

    // Please keep this for when we move the loading state to the Display
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })

  // afterEach(async () => {
  //   cleanup()
  // })

  it('Headings render', () => {
    expect(screen.getAllByRole('heading').length).toBe(4)
    expect(screen.getByRole('heading', { name: "Reporting - Member's Data" })).toBeInTheDocument
    expect(screen.getByRole('heading', { name: 'General Information' })).toBeInTheDocument
    expect(screen.getByRole('heading', { name: 'Measure Analysis' })).toBeInTheDocument
    expect(screen.getByRole('heading', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).toBeInTheDocument
  })

  it('Buttons render', () => {
    expect(screen.getAllByRole('button').length).toBe(4)
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument
    expect(screen.getByRole('button', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).toBeInTheDocument
    expect(screen.getAllByLabelText('info-button').length).toBe(2)
    // screen.debug()
  })

  it('Buttons are clickable', () => {
    const infoBtnArry = screen.getAllByLabelText('info-button')
    // upgrade RTL for user events
  })

  it('Member and policy info text fields exist', () => {
    const renderedMemberInfo = screen.getAllByRole('listitem')
    expect(renderedMemberInfo.length).toBe(13)
    const memberInfoLabels = [
      'MemberID:',
      'Date of Birth:',
      'Age:',
      'Gender:',
      'Coverage Status:',
      'Participation Period:',
      'Policy ID:',
      'Payor/Provider:',
      'Plan:',
      'Dependents:',
      'Relationship:',
      'Type:',
      'Participation Period:'
    ]
    memberInfoLabels.map((label, i) => {
      expect(within(renderedMemberInfo[i]).getByText(label)).toBeInTheDocument
    })
  })

  it('Member and policy info is loaded', () => {
    const renderedMemberInfo = screen.getAllByRole('listitem')
    const insurance = memberInfo.coverage[0]
    // we need more complete test data for this to be fleshed out
    const memberInfoData = [
      memberId,
      memberInfo.dob,
      getAge(memberInfo.dob),
      memberInfo.gender,
      'active',
      `${getDatestamp(new Date(coverage[0].period.start.value))} - ${
        getDatestamp(new Date(coverage[0].period.end.value))}`,
      insurance.id.value,
      insurance.payor[0].reference.value,
      'N/A',
      'N/A',
      insurance.relationship.coding[0].code.value,
      `${insurance.type?.coding[0].code.value} - ${insurance.type?.coding[0]?.display.value}`,
      `${getDatestamp(new Date(insurance.period.start.value))} - ${
        getDatestamp(new Date(insurance.period.end.value))}`
    ]
    memberInfoData.map((label, i) => {
      expect(within(renderedMemberInfo[i]).getByText(label)).toBeInTheDocument
    })
  })

  it('Links render', () => {
    expect(screen.getAllByRole('link').length).toBe(1)
    expect(screen.getByRole('link', { name: 'Export' })).toBeInTheDocument
  })

  it('Export button exists', () => {
    const exportBtn = screen.getByRole('link', { name: 'Export' })
    // need to upgrade RTL for userEvents
    expect(exportBtn.href).toBe(`http://localhost/${exportUrl}`)
  })

  it('Tooltips pop out and in', () => {
    const tooltipBtns = screen.getAllByLabelText('info-button')
    // upgrade RTL for user events
  })

  it('Accordian display renders data', () => {
    const dsDescription = datastore.info.aab.description
    expect(screen.getByText(dsDescription)).toBeInTheDocument
    // screen.debug()
  })

  // measure analysis pop up has information
  // measure analysis drop down renders
  // measure analysis has all the necessary information
  // display table renders
})
