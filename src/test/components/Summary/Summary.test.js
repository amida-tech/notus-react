import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import Info from '../../../components/Summary/Info';
import TrendDisplay from '../../../components/Summary/TrendDisplay';
import Banner from '../../../components/Summary/Banner'

describe('Banner', () => {
  test('checks that the timestamp rendered', () => {
    const date = '4-20-2022'
    const bannerRender = render(
      <Banner lastUpdated={date} />,
    );
    // screen.debug();
    expect(screen.queryByText(date)).not.toBeNull();
  })
});

describe('Info', () => {
  test('Opens and closes the info component, making sure text renders properly at each step', () => {
    const infoText = '418: I am a Teapot';
    const renderMe = render(
      <Info infoText={infoText} />,
    )
    expect(screen.queryByText(infoText)).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(infoText)).not.toBeNull();
    fireEvent.click(screen.getByText('CLOSE').closest('button'));
    expect(screen.queryByText(infoText)).toBeNull();
  })
});

describe('TrendDisplay', () => {
  const trend1 = { measure: 'ABC', percentChange: 50 }
  const trend2 = { measure: 'EFG', percentChange: -50 }
  const width1 = 25;
  const width2 = 50;

  test('tests the trend1 and width1 passthrough', () => {
    const { container } = render(
      <TrendDisplay trend={trend1} percentWidth={width1} />,
    )
    expect(screen.queryByText('ABC % Compliance')).not.toBeNull()
    expect(screen.queryByText('+50 %')).not.toBeNull()
    expect(container.firstChild.classList.contains('trend-display--width-25')).toBe(true)
  })

  test('tests the trend2 and width2 passthrough', () => {
    const { container } = render(
      <TrendDisplay trend={trend2} percentWidth={width2} />,
    )
    expect(screen.queryByText('EFG % Compliance')).not.toBeNull()
    expect(screen.queryByText('-50 %')).not.toBeNull()
    expect(container.firstChild.classList.contains('trend-display--width-50')).toBe(true)
  })
})
