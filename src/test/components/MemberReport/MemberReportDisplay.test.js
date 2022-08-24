import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import MemberReportDisplay from '../../../components/MemberReport/MemberReportDisplay';
import { getAge, getDatestamp } from '../../../components/Utilities/GeneralUtil';
import {
  coverage, exportUrl, memberId, memberInfo, rowData,
} from '../../data/DemoData';
import { datastore } from '../../data/datastore'

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
      />,
    )
    // Please keep this for when we move the loading state to the Display
    // await waitFor(() => container.getByRole('heading', { name: "Reporting - Member's Data" }))
    // await waitForElementToBeRemoved(() => container.getByText('Fetching...'))
  })

  it('Headings render', () => {
    expect(screen.getAllByRole('heading').length).toBe(4)
    expect(screen.getByRole('heading', { name: "Reporting - Member's Data" })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'General Information' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Measure Analysis' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).toBeTruthy()
  })

  it('Buttons render', () => {
    expect(screen.getAllByRole('button').length).toBe(4)
    expect(screen.getByRole('button', { name: 'Export' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis' })).toBeTruthy()
    // screen.debug()
  })

  it('Links render', () => {
    expect(screen.getAllByRole('link').length).toBe(1)
    expect(screen.getByRole('link', { name: 'Export' })).toBeTruthy()
  })

  it('Tooltips render', () => {
    const tooltips = screen.getAllByLabelText('info-button')
    expect(tooltips.length).toBe(2)
  })

  it('Export button render', () => {
    const exportBtn = screen.getByRole('link', { name: 'Export' })
    expect(exportBtn.href).toBe(`http://localhost/${exportUrl}`)
    // need to upgrade RTL for userEvents
  })

  it('Member and policy info labels render', () => {
    const renderedMemberInfo = screen.getAllByRole('listitem')
    expect(renderedMemberInfo.length).toBe(13)
    const memberInfoLabels = [
      'Member ID:',
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
      'Participation Period:',
    ]
    memberInfoLabels.forEach((label, i) => expect(within(renderedMemberInfo[i])
      .getByText(label)).toBeTruthy())
  })

  it('Member and policy data render', () => {
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
        getDatestamp(new Date(insurance.period.end.value))}`,
    ]
    memberInfoData.forEach((label, i) => expect(within(renderedMemberInfo[i])
      .getByText(label)).toBeTruthy())
  })

  it('Tooltips pop in and out', () => {
    const tooltips = [
      'The basic information about this member, including provider and payor information.',
      'Information about measurement compliance, from dates to practitioners involved, and assessment on how to improve.',
    ]
    const tooltipBtns = screen.getAllByLabelText('info-button')

    tooltipBtns.forEach((tip, i) => {
      fireEvent.click(tip)
      expect(screen.getByText(tooltips[i])).toBeTruthy()
      fireEvent.click(screen.getByText('CLOSE'))
      expect(screen.queryByText(tooltips[i])).toBeNull()
    })
  })

  it('Measure analysis labels render', async () => {
    const dsDescription = datastore.info.aab.description
    expect(screen.getByText(dsDescription)).toBeTruthy()

    const memberReportTable = screen.getByLabelText('member table')

    const analysisLabels = [
      'Measure',
      'Type',
      'Status',
      'Exclusions',
      'Practitioner',
      'Dates',
      'Conditions',
      'Recommendations',
    ]
    analysisLabels.forEach(
      (label) => expect(within(memberReportTable)
        .getByText(label)).toBeTruthy(),
    )
    const analysisData = rowData[0]

    const boolCounter = 0

    Object.values(analysisData).forEach((column) => {
      if (typeof column === 'boolean' && column === true) {
        const positiveArr = within(memberReportTable).getAllByTestId('CheckCircleIcon')
        expect(positiveArr[boolCounter]).toBeTruthy()
      } else if (column.length === 0 || column === false) {
        const negativeArr = within(memberReportTable).getAllByTestId('CancelIcon')
        expect(negativeArr[boolCounter]).toBeTruthy()
      } else {
        expect(within(memberReportTable).getByText(column)).toBeTruthy()
      }
    })
  })
})
