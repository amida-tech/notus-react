import {
  render, screen,
} from '@testing-library/react';
import {
  mockStatusSuccess, mockStatusFailure,
} from '../../data/DemoData';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../../layouts/Dashboard'
import Notification from '../../../components/Common/Notification';

describe('RatingTrends', () => {
  beforeEach(() => {
    render(
      <div>
        Dashboard Container
        <Notification
          status={200}
        />
      </div>
    );
  });

  describe('Notification', () => {
    // Notification renders if store provider catches a failed promise
    it('failure to connect alert does display', () => {
      render(
        <div>
          Dashboard Container
          <Notification
            status={404}
          />
        </div>
      )
      // expert alert to display
      // const links = screen.getAllByRole('link');
      // expect(links.length).toBe(5);
      screen.debug()
    });

    // If anything but 200 is caught by store provider
    it('failure to connect alert does not display', () => {render(
      <div>
        Dashboard Container
        <Notification
          status={200}
        />
      </div>
    )
      // expert alert to not display
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
    });
  });
});
