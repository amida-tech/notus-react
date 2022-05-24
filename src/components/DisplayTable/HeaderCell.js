import {
  Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import SaraswatiToolTip from '../Common/SaraswatiToolTip';

function HeaderCell({
  text, tooltip,
}) {
  return (
    <Box className="display-table__title-align">
      <Typography className="display-table__title">
        {text}
      </Typography>
      {tooltip && (
      <SaraswatiToolTip title={tooltip}>
        <HelpIcon className="display-table__help-icon" />
      </SaraswatiToolTip>
      )}
    </Box>
  )
}

HeaderCell.propTypes = {
  text: PropTypes.string,
  tooltip: PropTypes.string,
};

HeaderCell.defaultProps = {
  text: '',
  tooltip: '',
}

export default HeaderCell;
