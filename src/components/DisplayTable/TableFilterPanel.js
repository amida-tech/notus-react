import {
  Box, Checkbox, Divider, FormControlLabel, FormGroup, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'
import MemberSearch from '../Utilities/MemberSearch';

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
        <Box sx={{ color: theme.palette?.bluegray.D4 }} className="table-filter-panel__member-search">
          <MemberSearch />
        </Box>
        <FormGroup sx={{ color: theme.palette?.bluegray.D1 }} className="table-filter-panel__button-panel">
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
      <Divider sx={{ backgroundColor: theme.palette?.bluegray.L3 }} className="table-filter-panel__divider" />
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
