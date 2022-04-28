import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import PropTypes from 'prop-types';

function MeasureSelector({ currentResults, measure, handleMeasureChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel className="d3-indicator-by-line-selector">Select Measure</InputLabel>
      <Select
        className="indicator-by-line-selector__select"
        value={measure}
        label="Measure By Line"
        onChange={handleMeasureChange}
        sx={{ color: 'black.light' }}
      >
        {currentResults.map((result) => (
          <MenuItem
            sx={{ color: 'black.light' }}
            key={`by-line-menu-item-selector-${result.measure}`}
            value={result.measure}
          >
            {result.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MeasureSelector.propTypes = {
  currentResults: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
  measure: PropTypes.string,
  handleMeasureChange: PropTypes.func,
};

MeasureSelector.defaultProps = {
  currentResults: [],
  measure: '',
  handleMeasureChange: () => undefined,
}

export default MeasureSelector;
