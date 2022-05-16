import {
  Checkbox, FormGroup, Grid,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function CheckBoxHeaderCell({
  dataCount, handleCheckBoxEvent, selectedRows,
}) {
  return (
    <Grid item className="measure-results-table__title-align-small">
      <FormGroup className="measure-results-table__form-group">
        <Checkbox
          disableRipple
          checked={dataCount === selectedRows.length}
          size="medium"
          value="all"
          onChange={(event) => handleCheckBoxEvent(event)}
        />
      </FormGroup>
    </Grid>
  )
}

CheckBoxHeaderCell.propTypes = {
  dataCount: PropTypes.number,
  handleCheckBoxEvent: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

CheckBoxHeaderCell.defaultProps = {
  dataCount: 0,
  handleCheckBoxEvent: () => undefined,
  selectedRows: [],
}

export default CheckBoxHeaderCell;
