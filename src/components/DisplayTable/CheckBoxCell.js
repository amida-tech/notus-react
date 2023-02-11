import {
  Checkbox, FormGroup, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';

function CheckBoxCell({
  handleCheckBoxEvent, checked, value, color,
}) {
  return (
    <Grid item className="display-table__title-align-small">
      <FormGroup className="display-table__form-group">
        <Checkbox
          style={{ color }}
          disableRipple
          checked={checked}
          size="medium"
          value={value}
          onChange={(event) => handleCheckBoxEvent(event)}
        />
      </FormGroup>
    </Grid>
  );
}

CheckBoxCell.propTypes = {
  handleCheckBoxEvent: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
};

CheckBoxCell.defaultProps = {
  handleCheckBoxEvent: () => undefined,
  checked: false,
  value: '',
  color: '',
};

export default CheckBoxCell;
