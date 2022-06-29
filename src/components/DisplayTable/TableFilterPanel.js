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

function TableFilterPanel({
  measure, memberResult, tableFilter, headerInfo, memberData, handleTableFilterChange,
}) {
  // const memberSample = memberResult._id.split('').slice(0, memberResult._id.length - ( 3 + measure.split('').length)).join('')

  // const filteredIfZero = {
  //   1: 0,
  //   2: 0,
  //   3: 0
  // }

  // console.log(memberSample, '>>>>>', memberData[0].value)

  // if (memberSample === memberData[0].value) {
  //   memberData.forEach((measure) => {
  //     const member = Object.values(measure).filter((submeasure) => submeasure === 'false')
  //     if (member.length === 1) {
  //       filteredIfZero[1] += 1
  //     } else if (member.length === 2) {
  //       filteredIfZero[2] += 1
  //     } else if (member.length === 3) {
  //       filteredIfZero[3] += 1
  //     }
  //   })
  // } else {
  //   // I need og data to do this correctly oooor we are just going to accept you can additionally click any filter
  //   filteredIfZero[1] += 1
  //   filteredIfZero[2] += 1
  //   filteredIfZero[3] += 1
  // }

  // console.log(filteredIfZero)

  return (
    <Box className="table-filter-panel">
      <FormGroup className="table-filter-panel__button-panel">
        <Typography className="table-filter-panel__label">
          Member Compliance:
        </Typography>
        {memberComplianceItems.map((item, i) => {
          return (
            <FormControlLabel
              key={`table-filter-panel-${item.value}`}
              componentsProps={{ typography: { className: 'table-filter-panel__filter-item' } }}
              //disabled={filteredIfZero[i + 1] === 0}
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
        })}
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
