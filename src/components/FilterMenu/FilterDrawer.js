import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel'
import ToolTip from '@mui/material/Tooltip';
import {
  Box, Button, Drawer, Grid, Slider, Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  filterDrawerOpenProps,
  currentFiltersProps,
  toggleFilterDrawerProps,
  handleFilterChangeProps,
  setFilterActivatedProps,
  additionalFilterOptionsProps,
  setIsLoadingProps,
  setCompositeProps,
  setMemberResultsProps,
  setTableFilterProps,
  setRowEntriesProps,
} from '../ChartContainer/D3Props'
import FilterDrawerItem from './FilterDrawerItem';
import filterDrawerItemData from './FilterDrawerItemData';

const sliderTip = 'Selects the range of compliance.';

function FilterDrawer({
  currentFilters,
  handleFilterChange,
  filterDrawerOpen,
  toggleFilterDrawer,
  setFilterActivated,
  additionalFilterOptions,
  setIsLoading,
  setComposite,
  setMemberResults,
  setTableFilter,
  setRowEntries,
}) {
  const [percentSliderValue, setPercentSliderValue] = useState(
    Array.from(currentFilters.percentRange),
  );
  const [starChoices, setStarChoices] = useState(Array.from(currentFilters.stars));
  const [domainOfCareChoices, setDomainOfCareChoices] = useState(
    Array.from(currentFilters.domainsOfCare),
  );
  const [payorChoices, setPayorChoices] = useState(
    Array.from(currentFilters.payors),
  );
  const [healthcareProviderChoices, setHealthcareProviderChoices] = useState(
    Array.from(currentFilters.healthcareProviders),
  );
  const [healthcareCoverageChoices, setHealthcareCoverageChoices] = useState(
    Array.from(currentFilters.healthcareCoverages),
  );
  const [healthcarePractitionersChoices, setHealthcarePractitionersChoices] = useState(
    Array.from(currentFilters.healthcarePractitioners),
  );
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    toggleFilterDrawer(open);
  };
  const handleResetFilter = () => {
    setIsLoading(true)
    handleFilterChange({
      domainsOfCare: [],
      stars: [],
      percentRange: [0, 100],
      sum: 0,
      payors: [],
      healthcareProviders: [],
      healthcareCoverages: [],
      healthcarePractitioners: [],
    });
    setStarChoices([]);
    setDomainOfCareChoices([]);
    setPercentSliderValue([0, 100]);
    setPayorChoices([]);
    setHealthcareProviderChoices([]);
    setHealthcareCoverageChoices([]);
    setHealthcarePractitionersChoices([]);
    toggleFilterDrawer(false);
    window.location.reload();
  }
  const handlePayorChange = (event) => {
    if (event.target.checked) {
      setPayorChoices(payorChoices.concat(event.target.value));
    } else {
      setPayorChoices(payorChoices.filter((payer) => payer !== event.target.value));
    }
  }
  const handleHealthcareProviderChange = (event) => {
    if (event.target.checked) {
      setHealthcareProviderChoices(healthcareProviderChoices.concat(event.target.value));
    } else {
      setHealthcareProviderChoices(healthcareProviderChoices
        .filter((provider) => provider !== event.target.value));
    }
  }
  const handleHealthcareCoverageChange = (event) => {
    if (event.target.checked) {
      setHealthcareCoverageChoices(healthcareCoverageChoices.concat(event.target.value));
    } else {
      setHealthcareCoverageChoices(healthcareCoverageChoices
        .filter((coverage) => coverage !== event.target.value));
    }
  }
  const handlePractitionerChange = (event) => {
    if (event.target.checked) {
      setHealthcarePractitionersChoices(healthcarePractitionersChoices.concat(event.target.value));
    } else {
      setHealthcarePractitionersChoices(healthcarePractitionersChoices
        .filter((practitioner) => practitioner !== event.target.value));
    }
  }
  const handleStarChange = (event) => {
    if (event.target.checked) {
      setStarChoices(starChoices.concat(parseInt(event.target.value, 10)));
    } else {
      setStarChoices(starChoices.filter((star) => (star !== parseInt(event.target.value, 10))));
    }
  }
  const handleDomainOfCareChange = (event) => {
    if (event.target.checked) {
      setDomainOfCareChoices(domainOfCareChoices.concat(event.target.value));
    } else {
      setDomainOfCareChoices(domainOfCareChoices.filter((doc) => doc !== event.target.value));
    }
  }
  // https://mui.com/components/slider/#minimum-distance
  const handleSliderChange = (event, newValue) => {
    setPercentSliderValue(newValue);
  };
  const handleCancel = () => {
    setPercentSliderValue(Array.from(currentFilters.percentRange));
    setStarChoices(Array.from(currentFilters.stars));
    setDomainOfCareChoices(Array.from(currentFilters.domainsOfCare));
    setPayorChoices(Array.from(currentFilters.payors));
    setHealthcareProviderChoices(Array.from(currentFilters.healthcareProviders));
    setHealthcareCoverageChoices(Array.from(currentFilters.healthcareCoverages));
    setHealthcarePractitionersChoices(Array.from(currentFilters.healthcarePractitioners));
    toggleFilterDrawer(false);
    setFilterActivated(false);
    setMemberResults([])
    setTableFilter([])
    setRowEntries([])
    setComposite(true)
  }

  const handleApplyFilter = () => {
    setIsLoading(true)
    const filterOptions = {
      domainsOfCare: domainOfCareChoices,
      stars: starChoices,
      percentRange: percentSliderValue,
      payors: payorChoices,
      healthcareProviders: healthcareProviderChoices,
      healthcareCoverages: healthcareCoverageChoices,
      healthcarePractitioners: healthcarePractitionersChoices,
    };
    filterOptions.sum = filterDrawerItemData.sumCalculator(filterOptions, additionalFilterOptions);
    handleFilterChange(filterOptions);
    toggleFilterDrawer(false);
    setComposite(true)
  }
  const sliderValuetext = (value) => `${value}%`;

  return (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box
        className="filter-drawer"
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Grid container className="filter-drawer__title-section">
          <Grid item>
            <Typography className="filter-drawer__title" variant="h6">Filters</Typography>
          </Grid>
          <Grid item className="filter-drawer__close-icon-panel">
            <CloseIcon className="filter-drawer__close-icon" onClick={toggleDrawer(false)} />
          </Grid>
        </Grid>
        <Grid container className="filter-drawer__refine-section">
          <Grid item className="filter-drawer__refine-label-panel">
            <Typography className="filter-drawer__refine-label" variant="body1">Refine by:</Typography>
          </Grid>
          <Grid item className="filter-drawer__refine-section">
            <Button
              className="filter-drawer__reset-button"
              variant="outlined"
              onClick={handleResetFilter}
            >
              Reset Filters
              <CancelIcon className="filter-drawer__cancel-icon" />
            </Button>
          </Grid>
        </Grid>
        <Grid container item className="filter-drawer__options-section">
          <FilterDrawerItem
            filterItem={filterDrawerItemData.domainsOfCare}
            filterAction={handleDomainOfCareChange}
            currentFilter={domainOfCareChoices}
          />
          <Grid container item className="filter-drawer__slider-section">
            <Grid item className="filter-drawer__slider-title">
              <Typography className="filter-drawer__slider-label" variant="body1">Percent Range:</Typography>
            </Grid>
            <Grid item className="filter-drawer__help-panel">
              <ToolTip title={sliderTip}>
                <HelpIcon className="filter-drawer__help-icon" />
              </ToolTip>
            </Grid>
          </Grid>
          <Grid item className="filter-drawer__slider-body">
            <Slider
              getAriaLabel={() => 'Measurement percentage range'}
              defaultValue={percentSliderValue}
              value={percentSliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="on"
              getAriaValueText={sliderValuetext}
              className="filter-drawer__slider"
              marks={filterDrawerItemData.percentMarks}
              disableSwap
            />
          </Grid>
          <FilterDrawerItem
            filterItem={filterDrawerItemData.starRating}
            filterAction={handleStarChange}
            currentFilter={starChoices}
          />
          <FilterDrawerItem
            filterItem={filterDrawerItemData
              .payors(additionalFilterOptions.payors)}
            filterAction={handlePayorChange}
            currentFilter={payorChoices}
          />
          <FilterDrawerItem
            filterItem={filterDrawerItemData
              .healthcareProviders(additionalFilterOptions.healthcareProviders)}
            filterAction={handleHealthcareProviderChange}
            currentFilter={healthcareProviderChoices}
          />
          <FilterDrawerItem
            filterItem={filterDrawerItemData
              .healthcareCoverages(additionalFilterOptions.healthcareCoverages)}
            filterAction={handleHealthcareCoverageChange}
            currentFilter={healthcareCoverageChoices}
          />
          <FilterDrawerItem
            filterItem={filterDrawerItemData
              .healthcarePractitioners(additionalFilterOptions.healthcarePractitioners)}
            filterAction={handlePractitionerChange}
            currentFilter={healthcarePractitionersChoices}
          />
          <Grid container className="filter-drawer__button-control-section">
            <Grid item className="filter-drawer__button-panel">
              <Button
                className="filter-drawer__cancel-button"
                onClick={handleCancel}
                variant="outlined"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item className="filter-drawer__button-panel">
              <Button
                className="filter-drawer__apply-button"
                variant="contained"
                onClick={handleApplyFilter}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}

FilterDrawer.propTypes = {
  filterDrawerOpen: filterDrawerOpenProps,
  currentFilters: currentFiltersProps,
  toggleFilterDrawer: toggleFilterDrawerProps,
  handleFilterChange: handleFilterChangeProps,
  setFilterActivated: setFilterActivatedProps,
  additionalFilterOptions: additionalFilterOptionsProps,
  setIsLoading: setIsLoadingProps,
  setComposite: setCompositeProps,
  setMemberResults: setMemberResultsProps,
  setTableFilter: setTableFilterProps,
  setRowEntries: setRowEntriesProps,
};

FilterDrawer.defaultProps = {
  filterDrawerOpen: false,
  currentFilters: {
    domainsOfCare: [],
    stars: [],
    percentRange: [0, 100],
    sum: 0,
    payor: [],
    healthcareProvider: [],
    healthcareCoverage: [],
    practitioner: [],
  },
  toggleFilterDrawer: undefined,
  handleFilterChange: undefined,
  setFilterActivated: () => undefined,
  additionalFilterOptions: {},
  setIsLoading: () => undefined,
  setComposite: () => undefined,
  setMemberResults: () => undefined,
  setTableFilter: () => undefined,
  setRowEntries: () => undefined,
}

export default FilterDrawer;
