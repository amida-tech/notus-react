/* eslint-disable react/jsx-props-no-spreading */
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import TuneIcon from '@mui/icons-material/Tune';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';
import {
  Badge, Button, FormControlLabel, Grid, Menu, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TimelineOptions } from '../Utilities/ChartUtil';
import env from '../../env';

const timelineLabel = (choice) => {
  switch (choice) {
    case 'all':
      return 'All';
    case 'custom':
      return 'Custom';
    case 'ytd':
      return 'YTD';
    default:
      return `${choice} Days`;
  }
}

function ChartBar({
  filterDrawerOpen,
  toggleFilterDrawer,
  filterSum,
  currentTimeline,
  handleTimelineChange,
  filterDisabled,
}) {
  const buttonStyling = {};

  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);

  const handleDateOpen = (event) => {
    setDateOpen(true);
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateOpen(false);
    setDateAnchorEl(null);
  };

  const handleDateChange = (event) => {
    handleTimelineChange({
      choice: event.target.value,
      range: [null, null],
    });
    handleDateClose();
  }

  const onClickFilter = () => {
    toggleFilterDrawer(!filterDrawerOpen);
  };

  // TODO: Fix with the custom date picker in the future.
  const dateSelector = (newValue) => {
    const newDateSetting = {
      choice: 'custom',
      range: [newValue[0], newValue[1]],
    }
    handleTimelineChange(newDateSetting);
  }

  // TODO: Fix with the custom date picker in the future.
  const clearDate = () => {
    const newDateSetting = {
      choice: 'custom',
      range: [null, null],
    }
    handleTimelineChange(newDateSetting);
  }

  return (
    <Box className="chart-bar">
      <Grid container direction="row" justifyContent="flex-end" spacing={0.1}>
        <Grid item sx={buttonStyling}>
          <Button
            key="d3-YTD"
            color="primary"
            onClick={handleDateOpen}
            variant="text"
            startIcon={<DateRangeIcon />}
          >
            <Typography variant="caption">
              Timeline:&nbsp;
              {timelineLabel(currentTimeline.choice)}
            </Typography>
          </Button>
          <Menu
            id="date-menu"
            anchorEl={dateAnchorEl}
            open={dateOpen}
            onClose={handleDateClose}
            onClick={null}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <RadioGroup
              className="chart-bar__radio-panel"
              value={currentTimeline.choice}
            >
              {TimelineOptions.map((option) => (
                <FormControlLabel
                  key={`chart-bar-timeline-${option.value}`}
                  className="chart-bar__radio-label"
                  value={option.value}
                  control={<Radio onClick={handleDateChange} />}
                  label={option.label}
                />
              ))}
              { env.REACT_APP_MVP_SETTING === 'false'
                && (
                <Box className="chart-bar__date-range">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDateRangePicker
                      className="chart-bar__date-range-picker"
                      startText="Start"
                      value={currentTimeline.range}
                      onChange={dateSelector}
                      style={{ color: 'black' }}
                      renderInput={(startProps, endProps) => (
                        <Box className="chart-bar__date-panel">
                          <TextField className="chart-bar__date-text" {...startProps} />
                          <Box className="chart-bar__between-text"> to </Box>
                          <TextField className="chart-bar__date-text" {...endProps} />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                  <Grid container justifyContent="center" sx={{ m: '10px', ml: '-10px' }}>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={clearDate}>
                        Clear Selection
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                )}
            </RadioGroup>
          </Menu>
        </Grid>

        <Grid item sx={buttonStyling}>
          <Badge badgeContent={filterSum} className={`chart-bar__badge${filterDisabled ? '--hidden' : ''}`}>
            <Button
              className="chart-bar__filter-button"
              color="primary"
              variant="text"
              onClick={onClickFilter}
              disabled={filterDisabled}
              startIcon={(
                <FilterAltIcon />
              )}
            >
              <Typography variant="caption">
                Filter
              </Typography>
            </Button>
          </Badge>
        </Grid>
      </Grid>
    </Box>
  )
}

ChartBar.propTypes = {
  filterDrawerOpen: PropTypes.bool,
  toggleFilterDrawer: PropTypes.func,
  filterSum: PropTypes.number,
  // Necessary for DateRangePicker to function and pass props
  currentTimeline: PropTypes.shape({
    choice: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.string),
  }),
  handleTimelineChange: PropTypes.func,
  filterDisabled: PropTypes.bool,
};

ChartBar.defaultProps = {
  filterDrawerOpen: false,
  toggleFilterDrawer: undefined,
  filterSum: 0,
  currentTimeline: {
    choice: 'all',
    range: [null, null],
  },
  handleTimelineChange: undefined,
  filterDisabled: false,
}

export default ChartBar;
