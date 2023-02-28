import {
  render, screen
} from '@testing-library/react';
import {
  mockStatusSuccess, mockStatusFailure,
} from '../../data/DemoData';
import Notification from '../../../components/Common/Notification';

describe('Notification', () => {
  // Notification renders if store provider catches a failed promise
  it('failure to connect alert does display', () => {
    render(
      <div>
        Dashboard Container
        <Notification
          status={mockStatusFailure}
        />
      </div>
    )
    const header = screen.findByRole('heading', { name: 'Error Retrieving Network Data' })
    expect(header).toBeTruthy()
  });

  // If anything but 200 is caught by store provider
  it('failure to connect alert does not display', () => {render(
    <div>
      Dashboard Container
      <Notification
        status={mockStatusSuccess}
      />
    </div>
  )
    // expert alert to not display
    const header = screen.queryByText('Error Retrieving Network Data')
    expect(header).toBeNull()
  });

  // If status is undefined
  it('failure to connect alert does not display if no response made', () => {render(
    <div>
      Dashboard Container
      <Notification
        status={undefined}
      />
    </div>
  )
    // expert alert to not display
    const header = screen.queryByText('Error Retrieving Network Data')
    expect(header).toBeNull()
  });
});
