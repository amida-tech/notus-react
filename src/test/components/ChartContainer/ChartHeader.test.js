import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartHeader from '../../../components/ChartContainer/ChartHeader';

describe('ChartHeader', () => {
  it('renders', () => {
    render(<ChartHeader isComposite={true} isLoading={false} />);
    // Identify the header and assert it exists.
    const header = screen.getByText(/All Measures/i);
    expect(header).toBeInTheDocument();
  });
});
