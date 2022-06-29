import {
  Box, Checkbox, Divider, FormGroup, FormControlLabel, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const memberComplianceItems = [
  { label: '1 Non-Compliant Submeasure', value: 'one' },
  { label: '2 Non-Compliant Submeasures', value: 'two' },
  { label: 'More than 2 Non-Compliant Submeasures', value: 'many' },
];

const numeratorValues = ['id', 'Numerator 2', 'Numerator 3'];

function TableFilterPanel({
  measure, memberResult, tableFilter, headerInfo, handleTableFilterChange,
}) {
  const numeratorCheck = memberResult[
    Object.keys(memberResult).find((key) => key.startsWith(measure))
  ];
  console.log(headerInfo)

  return (
    <Box className="table-filter-panel">
      <FormGroup className="table-filter-panel__button-panel">
        <Typography className="table-filter-panel__label">
          Member Compliance:
        </Typography>
        {memberComplianceItems.map((item, index) => {
          const disableVal = headerInfo.length === 2 ?
            typeof numeratorCheck?.[numeratorValues[index]] !== 'string'
            : numeratorCheck?.[numeratorValues[index]] !== true
          return (
            <FormControlLabel
              key={`table-filter-panel-${item.value}`}
              componentsProps={{ typography: { className: 'table-filter-panel__filter-item' } }}
              disabled={disableVal}
              control={(
                <Checkbox
                  checked={tableFilter.includes(item.value)}
                  value={item.value}
                  className="table-filter-panel__filter-checkbox"
                  onChange={(e) => handleTableFilterChange(e)}
                />
                  )}
              label={item.label}
            />
          )
        }
          )}
      </FormGroup>
      <Divider className="table-filter-panel__divider" />
    </Box>
  )
}

TableFilterPanel.propTypes = {
  measure: PropTypes.string,
  memberResult: PropTypes.shape({}),
  tableFilter: PropTypes.arrayOf(PropTypes.string),
  handleTableFilterChange: PropTypes.func,
};

TableFilterPanel.defaultProps = {
  measure: '',
  memberResult: {},
  tableFilter: [],
  handleTableFilterChange: () => undefined,
}

export default TableFilterPanel;
