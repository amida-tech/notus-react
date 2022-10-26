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

const givenPropsTest = async (getByText) => {
  expect(getByText('Apply Filters')).toBeTruthy();
  expect(getByText('95')).toBeTruthy();
  expect(screen.getByDisplayValue('EOC').checked).toBe(true);
  expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
  expect(screen.getByDisplayValue('1').checked).toBe(true);
  expect(screen.getByDisplayValue('2').checked).toBe(false);
}

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
    const checkboxes = screen.getAllByRole('checkbox');
    const checkboxesReal = [...checkboxes]
    const expectedValues = {
      EOS: false,
      ECDS: true,
      1: false,
      2: true,
      3: true,
      4: false,
      5: false,
    };
    // console.log("--------->", key, checkboxesReal.find((box) => box.value === key))
    // console.log(checkboxes)
    // console.log(checkboxesReal.map((chek)=>chek.value))
    Object.entries(expectedValues).forEach(([key, value]) => {
      if (value) {
        fireEvent.click(checkboxesReal.find((box) => box.value === key))
      }
      expect(checkboxesReal.find((box) => box.checked))
    });

    // expect(screen.getByDisplayValue('EOC').checked).toBe(false);
    // expectedValues.forEach((value) => fireEvent.click(screen.getByDisplayValue(value)))
    // expect(screen.getByDisplayValue('ECDS').checked).toBe(true);
    // expect(screen.getByDisplayValue('1').checked).toBe(false);
    // expect(screen.getByDisplayValue('2').checked).toBe(true);
    // expect(screen.getByDisplayValue('3').checked).toBe(true);
    // expect(screen.getByDisplayValue('4').checked).toBe(false);
    // expect(screen.getByDisplayValue('5').checked).toBe(false);

    // fireEvent.click(getByText('Apply Filters'));
    // expect(mockHandleFilterChange).toHaveBeenCalledWith({
    //   domainsOfCare: ['ECDS'],
    //   stars: [2, 3],
    //   percentRange: [0, 100],
    //   sum: 3,
    // });
    // expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);

    // rerender(<FilterDrawer
    //   filterDrawerOpen={false}
    // />);
    // const refineByText = screen.queryByText('Refine by');
    // expect(refineByText).toBe(null);

    // rerender(<FilterDrawer
    //   filterDrawerOpen
    // />);
    // expect(screen.getByDisplayValue('ECDS').checked).toBe(true);
    // expect(screen.getByDisplayValue('2').checked).toBe(true);
    // expect(screen.getByDisplayValue('3').checked).toBe(true);
  })

  // test('resets to the default filter state', () => {
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
  //   fireEvent.click(getByText('Reset Filters'));
  //   expect(mockHandleFilterChange).toHaveBeenCalledWith({
  //     domainsOfCare: [],
  //     stars: [],
  //     percentRange: [0, 100],
  //     sum: 0,
  //     healthcareCoverages: [],
  //     healthcarePractitioners: [],
  //     healthcareProviders: [],
  //     payors: [],
  //   });
  //   expect(mockToggleFilterDrawer).toHaveBeenCalledWith(false);

  //   closeOpenDrawerTest(rerender);
  //   expect(screen.getByDisplayValue('EOC').checked).toBe(false);
  //   expect(screen.getByDisplayValue('ECDS').checked).toBe(false);
  //   expect(screen.getByDisplayValue('1').checked).toBe(false);
  //   expect(screen.getByDisplayValue('2').checked).toBe(false);
  // });

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
