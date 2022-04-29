import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import Banner from '../../../components/Summary/Banner'

describe('Banner', () => {
  test('checks that the timestamp rendered', () => {
    const date = '4-20-2022'
    const { getByText } = render(
      <Banner lastUpdated={date} />,
    );
    // screen.debug();
    expect(screen.queryByText(date)).not.toBeNull();
  })
});
