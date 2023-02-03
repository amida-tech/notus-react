import {
  render, screen,
} from '@testing-library/react';
import Banner from '../../../components/Common/Banner';

describe('Banner', () => {
  test('checks that the timestamp rendered', () => {
    const date = '4-20-2022';
    render(
      <Banner lastUpdated={date} />,
    );
    expect(screen.queryByText(date)).not.toBeNull();
  });
});
