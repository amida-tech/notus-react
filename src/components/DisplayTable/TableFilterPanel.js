import {
  Box, Checkbox, Divider, FormGroup, FormControlLabel, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const memberComplianceItems = [
  { label: '1 Non-Compliant Submeasure', value: 'one' },
  { label: '2 Non-Compliant Submeasures', value: 'two' },
  { label: 'More than 2 Non-Compliant Submeasures', value: 'many' },
];

function TableFilterPanel({
  tableFilter, handleTableFilterChange,
}) {
  return (
    <>
      <Box className="table-filter-panel">
        <Box className="table-filter-panel__member-search">
          Search Bar
        </Box>
        <FormGroup className="table-filter-panel__button-panel">
          <Typography className="table-filter-panel__label">
            Member Compliance:
          </Typography>
          {memberComplianceItems.map((item) => (
            <FormControlLabel
              key={`table-filter-panel-${item.value}`}
              componentsProps={{ typography: { className: 'table-filter-panel__filter-item' } }}
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
          ))}
        </FormGroup>
      </Box>
      <Divider className="table-filter-panel__divider" />
    </>
  )
}

TableFilterPanel.propTypes = {
  memberResult: PropTypes.shape({}),
  tableFilter: PropTypes.arrayOf(PropTypes.string),
  handleTableFilterChange: PropTypes.func,
};

TableFilterPanel.defaultProps = {
  memberResult: {},
  tableFilter: [],
  handleTableFilterChange: () => undefined,
}

export default TableFilterPanel;
