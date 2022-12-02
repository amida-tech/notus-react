import HelpIcon from '@mui/icons-material/Help';
import {
  Checkbox, FormControlLabel, FormGroup, Grid, Tooltip, Typography,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'

function FilterDrawerItem({ filterItem, currentFilter, filterAction }) {
  const [defaultCheck] = useState(Array.from(currentFilter));
  return (
    <Grid container item className="filter-drawer-item">
      <Grid container item className="filter-drawer-item__section">
        <Grid item className="filter-drawer-item__row">
          <Typography className="filter-drawer-item__label" variant="body1">
            {filterItem.name}
            :
            {' '}
          </Typography>
        </Grid>
        <Grid item className="filter-drawer-item__row">
          <Tooltip title={filterItem.tip}>
            <HelpIcon sx={{ fill: theme.palette?.bluegray.L3 }} className="filter-drawer-item__help-icon" />
          </Tooltip>
        </Grid>
      </Grid>
      <FormGroup className="filter-drawer-item__options">
        {filterItem.options
          ? (filterItem.options.map((option, index) => (
            <FormControlLabel
              key={`filter-drawer-item-option-${option}`}
              componentsProps={{ typography: { className: 'filter-drawer-item__option-label' } }}
              control={(
                <Checkbox
                  value={filterItem.values[index]}
                  defaultChecked={defaultCheck.includes(filterItem.values[index])}
                  className="filter-drawer-item__option-checkbox"
                  onChange={filterAction}
                />
            )}
              label={option}
            />
          )))
          : null}
      </FormGroup>
    </Grid>
  )
}

FilterDrawerItem.propTypes = {
  filterItem: PropTypes.shape({
    name: PropTypes.string,
    tip: PropTypes.string,
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    options: PropTypes.arrayOf(PropTypes.string),
  }),
  currentFilter: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  filterAction: PropTypes.func,
}

FilterDrawerItem.defaultProps = {
  filterItem: {
    name: '',
    tip: '',
    options: [],
    values: [],
  },
  currentFilter: [],
  filterAction: undefined,
}

export default FilterDrawerItem;
