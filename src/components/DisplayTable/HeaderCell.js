import {
  Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ToolTip from '@mui/material/Tooltip';

function HeaderCell({
  text, tooltip,

}) {
  return (
    <Box className={text === 'Measure' || text === 'Sub-Measure' ? 'display-table__title-align--left' : 'display-table__title-align'}>
      {tooltip && (
        <ToolTip title={tooltip} arrow>
          <Typography className="display-table__title">
            {text}
          </Typography>
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
