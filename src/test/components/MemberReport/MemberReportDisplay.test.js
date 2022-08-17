import {
  fireEvent, render, screen,
} from '@testing-library/react';
import MemberReport from 'layouts/MemberReport';
import MemberReportDisplay from '../../../components/MemberReport/MemberReportDisplay'

describe('Member Report Display', () => {
  it('Renders on Load', () => {
    render(
      <MemberReport>
        <MemberReportDisplay />
      </MemberReport>
    )
  });
});