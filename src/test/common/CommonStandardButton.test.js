import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StandardButton } from 'components/Common/CommonStandardButton';

describe('StandardButton', () => {
  it('contained variant renders correctly', () => {
    render(<StandardButton variant='contained' />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain(
      'MuiButton-contained MuiButton-containedPrimary',
    );
    expect(btn).toBeInTheDocument();
  });

  it('outlined variant renders correctly', () => {
    render(<StandardButton variant='outlined' />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain(
      'MuiButton-outlined MuiButton-outlinedPrimary',
    );
    expect(btn).toBeInTheDocument();
  });

  it('text variant renders correctly', () => {
    render(<StandardButton variant='text' />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('MuiButton-text MuiButton-textPrimary');
    expect(btn).toBeInTheDocument();
  });

  it('an undefined variant renders correctly', () => {
    const variant = 'best-btn';
    render(<StandardButton variant={variant} />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain(
      `MuiButton-${variant} MuiButton-${variant}Primary`,
    );
  });
});
