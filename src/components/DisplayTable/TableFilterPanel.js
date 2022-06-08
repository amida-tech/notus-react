import {
  Box, Checkbox, Divider, FormGroup, FormControlLabel, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const patientComplianceItems = [
  { label: '1 Non-Compliant Submeasure', value: 'one' },
  { label: '2 Non-Compliant Submeasures', value: 'two' },
  { label: 'More than 2 Non-Compliant Submeasures', value: 'many' },
];

const numeratorValues = ['id', 'Numerator 2', 'Numerator 3'];

function TableFilterPanel({
  measure, patientResult, tableFilter, handleTableFilterChange,
}) {
  const numeratorCheck = patientResult[
    Object.keys(patientResult).find((key) => key.startsWith(measure))];
  return (
    <Box className="table-filter-panel">
      <FormGroup className="table-filter-panel__button-panel">
        <Typography className="table-filter-panel__label">
          Member Compliance:
        </Typography>
        {patientComplianceItems.map((item, index) => (
          <FormControlLabel
            key={`table-filter-panel-${item.value}`}
            componentsProps={{ typography: { className: 'table-filter-panel__filter-item' } }}
            disabled={numeratorCheck?.[numeratorValues[index]] === undefined}
            control={(
              <Checkbox
                checked={tableFilter === item.value}
                value={item.value}
                className="table-filter-panel__filter-checkbox"
                onChange={(e) => handleTableFilterChange(e)}
              />
                )}
            label={item.label}
          />
        ))}
      </FormGroup>
      <Divider className="table-filter-panel__divider" />
    </Box>
  )
}

TableFilterPanel.propTypes = {
  measure: PropTypes.string,
  patientResult: PropTypes.shape({}),
  tableFilter: PropTypes.string,
  handleTableFilterChange: PropTypes.func,
};

TableFilterPanel.defaultProps = {
  measure: '',
  patientResult: {},
  tableFilter: '',
  handleTableFilterChange: () => undefined,
}

export default TableFilterPanel;
