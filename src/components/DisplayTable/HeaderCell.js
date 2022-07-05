import {
  Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ToolTip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

function HeaderCell({
  text, tooltip,
}) {
  const checkText = text === 'Measure' || text === 'Sub-Measure'

  function headerGenerator() {
    if (checkText && tooltip) {
      return (
        <>
          <Typography className="display-table__title">
            {text}
          </Typography>
          <ToolTip title={tooltip} arrow>
            <HelpIcon className="display-table__help-icon" />
          </ToolTip>
        </>
      )
    } if (tooltip) {
      return (
        <ToolTip title={tooltip} arrow>
          <Typography className="display-table__title">
            {text}
          </Typography>
        </ToolTip>
      )
    }
    return (
      <Typography className="display-table__title">
        {text}
      </Typography>
    )
  }
  return (
    <Box className={checkText ? 'display-table__title-align--left' : 'display-table__title-align'}>
      {headerGenerator()}
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
