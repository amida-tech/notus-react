import {
  Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';

function HeaderCell({
  text, tooltip,
}) {
  return (
    <Box className="display-table__title-align">
      <Typography className="display-table__title">
          {text}
        </Typography>
      {tooltip && (
      <ToolTip title={tooltip}>
        <HelpIcon className="display-table__help-icon" />
      </ToolTip>
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
