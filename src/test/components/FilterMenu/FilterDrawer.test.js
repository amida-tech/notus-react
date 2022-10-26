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

const closeOpenDrawerTest = (rerender) => {
  rerender(<FilterDrawer
    filterDrawerOpen={false}
  />);
  const refineByText = screen.queryByText('Refine by');
  expect(refineByText).toBe(null);
  rerender(<FilterDrawer
    filterDrawerOpen
  />);
}

// TO DO: Write test for the slider. https://stackoverflow.com/questions/58856094/testing-a-material-ui-slider-with-testing-library-react
describe('FilterDrawer', () => {
  test('checks that the filter is applied', () => {
    const { getByText, rerender } = render(
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
      expect( value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });

    // we expect our handleFilterChange function to be called with appropriate filters when the drawer closes and opens again
    fireEvent.click(getByText('Apply Filters'));
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
      expect( value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });
  })

  test('resets to the default filter state', () => {
    const { getByText, rerender } = render(
      <FilterDrawer
        filterDrawerOpen
        handleFilterChange={mockHandleFilterChange}
        currentFilters={filters}
        additionalFilterOptions={additionalFilterOptions}
        toggleFilterDrawer={mockToggleFilterDrawer}
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
      expect( value ? checkboxes.find((box) => box.checked) : checkboxes.find((box) => !box.checked))
    });

    fireEvent.click(getByText('Reset Filters'));
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      domainsOfCare: [],
      stars: [],
      percentRange: [0, 100],
      sum: 0,
      healthcareCoverages: [],
      healthcarePractitioners: [],
      healthcareProviders: [],
      payors: [],
    });
    expect(mockToggleFilterDrawer).toHaveBeenCalled();

    // closeOpenDrawerTest(rerender);
    // expect(screen.getByDisplayValue('EOC').checked).toBe(false);
    // expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
    // expect(screen.getByDisplayValue('1').checked).toBe(false);
    // expect(screen.getByDisplayValue('2').checked).toBe(false);
  });

  // test('cancels the filter changes', () => {
  //   const { getByText, rerender } = render(
  //     <FilterDrawer
  //       filterDrawerOpen
  //       handleFilterChange={mockHandleFilterChange}
  //       currentFilters={filters}
  //       additionalFilterOptions={additionalFilterOptions}
  //       toggleFilterDrawer={mockToggleFilterDrawer}
  //     />,
  //   );

  //   givenPropsTest(getByText);
  //   expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
  //   expect(screen.getByDisplayValue('2').checked).toBe(false);
  //   fireEvent.click(screen.getByDisplayValue('ECDS'));
  //   fireEvent.click(screen.getByDisplayValue('2'));
  //   expect(screen.getByDisplayValue('ECDS').checked).toBe(true);
  //   expect(screen.getByDisplayValue('2').checked).toBe(true);

  //   fireEvent.click(getByText('Cancel'));
  //   expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);
  //   expect(mockHandleFilterChange).not.toHaveBeenCalled();

  //   closeOpenDrawerTest(rerender);
  //   expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
  //   expect(screen.getByDisplayValue('2').checked).toBe(false);
  // });
})
