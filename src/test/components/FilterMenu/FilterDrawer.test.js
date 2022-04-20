import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import FilterDrawer from '../../../components/FilterMenu/FilterDrawer';

const filters = {
  domainsOfCare: ['EOC'],
  stars: [1],
  percentRange: [5, 95],
  sum: 3,
};

const mockHandleFilterChange = jest.fn(() => false);
const mockToggleFilterDrawer = jest.fn(() => false);

const givenPropsTest = async (getByText) => {
  expect(getByText('Apply Filters')).toBeTruthy();
  expect(getByText('95')).toBeTruthy();
  expect(screen.getByDisplayValue('EOC').checked).toBe(true);
  expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
  expect(screen.getByDisplayValue('1').checked).toBe(true);
  expect(screen.getByDisplayValue('2').checked).toBe(false);
}

describe('FilterDrawer', () => {
  test('checks that the filter is applied', () => {
    const { getByText } = render(
      <FilterDrawer
        filterDrawerOpen
        handleFilterChange={mockHandleFilterChange}
        toggleFilterDrawer={mockToggleFilterDrawer}
      />,
    );

    fireEvent.click(screen.getByDisplayValue('ECDS'));
    fireEvent.click(screen.getByDisplayValue('2'));
    fireEvent.click(screen.getByDisplayValue('3'));

    expect(screen.getByDisplayValue('EOC').checked).toBe(false);
    expect(screen.getByDisplayValue('ECDS').checked).toBe(true);

    expect(screen.getByDisplayValue('1').checked).toBe(false);
    expect(screen.getByDisplayValue('2').checked).toBe(true);
    expect(screen.getByDisplayValue('3').checked).toBe(true);
    expect(screen.getByDisplayValue('4').checked).toBe(false);
    expect(screen.getByDisplayValue('5').checked).toBe(false);

    fireEvent.click(getByText('Apply Filters'));
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      domainsOfCare: ['ECDS'],
      stars: [2, 3],
      percentRange: [0, 100],
      sum: 3,
    });
    expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);
  })

  test('resets to the default filter state', () => {
    const { getByText } = render(
      <FilterDrawer
        filterDrawerOpen
        handleFilterChange={mockHandleFilterChange}
        currentFilters={filters}
        toggleFilterDrawer={mockToggleFilterDrawer}
      />,
    );
    givenPropsTest(getByText);
    fireEvent.click(getByText('Reset Filters'));
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      domainsOfCare: [],
      stars: [],
      percentRange: [0, 100],
      sum: 0,
    });
    expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);
  });

  test('cancels the filter changes', () => {
    const { getByText } = render(
      <FilterDrawer
        filterDrawerOpen
        handleFilterChange={mockHandleFilterChange}
        currentFilters={filters}
        toggleFilterDrawer={mockToggleFilterDrawer}
      />,
    );
    givenPropsTest(getByText);
    fireEvent.click(screen.getByDisplayValue('ECDS'));
    fireEvent.click(screen.getByDisplayValue('2'));
    expect(screen.getByDisplayValue('ECDS').checked).toBe(true);
    expect(screen.getByDisplayValue('2').checked).toBe(true);

    fireEvent.click(getByText('Cancel'));
    expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);
    expect(mockHandleFilterChange).not.toHaveBeenCalled();
  });
})
