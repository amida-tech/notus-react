import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StandardButton } from 'components/Common/CommonStandardButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

describe('StandardButton', () => {
  it('renders the contained button with left and right icons correctly', () => {
    // Render a contained variant StandardButton
    render(
      <StandardButton
        variant='contained'
        leftIcon={<CheckCircleIcon />}
        rightIcon={<CheckBoxIcon />}
      >
        Wrapped Text
      </StandardButton>,
    );
    // Identify the button and assert it exists
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // Assert the button has the correct classes
    expect(btn.className).toContain(
      'MuiButton-contained MuiButton-containedPrimary',
    );
    // Clicks the standard button w/ default onClick prop
    act(() => {
      fireEvent.click(btn);
    });
    // Identify the left and right icons and assert they exist
    const leftIcon = screen.getByTestId('CheckCircleIcon');
    const rightIcon = screen.getByTestId('CheckBoxIcon');
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
    // Identify the wrapped text and assert it exists
    const wrappedText = screen.getByText(/wrapped text/i);
    expect(wrappedText).toBeInTheDocument();
  });

  it('outlined variant renders correctly', () => {
    // Render a outlined variant StandardButton
    render(<StandardButton variant='outlined' />);
    // Identify the button and assert it exists
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // Assert the button has the correct classes
    expect(btn.className).toContain(
      'MuiButton-outlined MuiButton-outlinedPrimary',
    );
  });

  it('text variant renders correctly', () => {
    // Render a text variant StandardButton
    render(<StandardButton variant='text' />);
    // Identify the button and assert it exists
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // Assert the button has the correct classes
    expect(btn.className).toContain('MuiButton-text MuiButton-textPrimary');
  });

  it('an undefined variant renders correctly', () => {
    // Render an undefined variant StandardButton
    const variant = 'best-btn';
    render(<StandardButton variant={variant} />);
    // Identify the button and assert it exists
    const btn = screen.getByRole('button');
    expect(btn.className).toContain(
      `MuiButton-${variant} MuiButton-${variant}Primary`,
    );
  });
});
