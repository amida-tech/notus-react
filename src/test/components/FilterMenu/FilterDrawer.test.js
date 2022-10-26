import {
  fireEvent, render, screen,
} from '@testing-library/react';
import FilterDrawer from '../../../components/FilterMenu/FilterDrawer';
import { additionalFilterOptions } from '../../data/DemoData';

const filters = {
  domainsOfCare: [],
  stars: [],
  percentRange: [0, 100],
  sum: 0,
  healthcareCoverages: [],
  healthcarePractitioners: [],
  healthcareProviders: [],
  payors: [],
};

const mockHandleFilterChange = jest.fn(() => false);
const mockToggleFilterDrawer = jest.fn(() => false);
const mockHandleResetData = jest.fn(() => false);

const closeOpenDrawerTest = (rerender) => {
  rerender(<FilterDrawer
    filterDrawerOpen={false}
    currentFilters={filters}
    additionalFilterOptions={additionalFilterOptions}
  />);
  const refineByText = screen.queryByText('Refine by');
  expect(refineByText).toBe(null);
  rerender(<FilterDrawer
    filterDrawerOpen
    currentFilters={filters}
    additionalFilterOptions={additionalFilterOptions}
  />);
}

// TO DO: Write test for the slider. https://stackoverflow.com/questions/58856094/testing-a-material-ui-slider-with-testing-library-react
describe('FilterDrawer', () => {
  test('checks that the filter is applied', () => {
    const { rerender } = render(
      <FilterDrawer
        filterDrawerOpen
        currentFilters={filters}
        additionalFilterOptions={additionalFilterOptions}
        handleFilterChange={mockHandleFilterChange}
        toggleFilterDrawer={mockToggleFilterDrawer}
      />,
    );

    // grab all checkboxes on DOM, select which we want checked with 'true'
    const checkboxes = [...screen.getAllByRole('checkbox')];
    const expectedValues = {
      EOC: false,
      ECDS: true,
      1: false,
      2: true,
      3: true,
      4: false,
      5: false,
    };

    // for each of values to be tested, we will click or not
    // expect box to be sucessefully checked or not
    Object.entries(expectedValues).forEach(([key, value]) => {
      if (value) {
        fireEvent.click(checkboxes.find((box) => box.value === key))
      }
      expect(value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });

    // we expect our handleFilterChange function to be called with appropriate filters
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      domainsOfCare: ['ECDS'],
      stars: [2, 3],
      percentRange: [0, 100],
      sum: 3,
      healthcareCoverages: [],
      healthcarePractitioners: [],
      healthcareProviders: [],
      payors: [],
    });
    expect(mockToggleFilterDrawer).toHaveBeenCalled();

    rerender(<FilterDrawer
      filterDrawerOpen={false}
      currentFilters={filters}
      additionalFilterOptions={additionalFilterOptions}
      handleFilterChange={mockHandleFilterChange}
      toggleFilterDrawer={mockToggleFilterDrawer}
    />);
    const refineByText = screen.queryByText('Refine by');
    expect(refineByText).toBe(null);

    rerender(<FilterDrawer
      filterDrawerOpen
      currentFilters={filters}
      additionalFilterOptions={additionalFilterOptions}
      handleFilterChange={mockHandleFilterChange}
      toggleFilterDrawer={mockToggleFilterDrawer}
    />);

    Object.values(expectedValues).forEach((value) => {
      expect(value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });
  })

  test('resets to the default filter state', () => {
    render(
      <FilterDrawer
        filterDrawerOpen
        handleFilterChange={mockHandleFilterChange}
        currentFilters={filters}
        additionalFilterOptions={additionalFilterOptions}
        toggleFilterDrawer={mockToggleFilterDrawer}
        handleResetData={mockHandleResetData}
      />,
    );

    // grab all checkboxes on DOM, select which we want checked with 'true'
    const checkboxes = [...screen.getAllByRole('checkbox')];
    const expectedValues = {
      EOC: true,
      ECDS: false,
      1: true,
      2: false,
      3: false,
      4: true,
      5: false,
    };

    Object.entries(expectedValues).forEach(([key, value]) => {
      if (value) {
        fireEvent.click(checkboxes.find((box) => box.value === key))
      }
      expect(value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Filters' }))
    expect(mockHandleResetData).toHaveBeenCalled();
    expect(mockToggleFilterDrawer).toHaveBeenCalled();
  });

  test('cancels the filter changes', () => {
    const { rerender } = render(
      <FilterDrawer
        filterDrawerOpen
        currentFilters={filters}
        additionalFilterOptions={additionalFilterOptions}
        handleFilterChange={mockHandleFilterChange}
        toggleFilterDrawer={mockToggleFilterDrawer}
      />,
    );

    // grab all checkboxes on DOM, select which we want checked with 'true'
    const checkboxes = [...screen.getAllByRole('checkbox')];
    const expectedValues = {
      EOC: false,
      ECDS: true,
      1: false,
      2: true,
      3: true,
      4: false,
      5: false,
    };

    // for each of values to be tested, we will click or not
    // expect box to be sucessefully checked or not
    Object.entries(expectedValues).forEach(([key, value]) => {
      if (value) {
        fireEvent.click(checkboxes.find((box) => box.value === key))
      }
      expect(value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockToggleFilterDrawer).toHaveBeenCalled();

    closeOpenDrawerTest(rerender);
  });
})
