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

  const overviewExceptions = ['Measures', 'Sub-Measures']
  const memberExceptions = ['MemberID']

  function subTheMeasure(text) {
    return text.split('').includes(':') ? text.split(':')[1] : text
  }

  function headerGenerator() {
    if (memberExceptions.includes(text)) {
      return (
        <>
          <ToolTip title={tooltip} arrow>
            <Typography className="display-table__title" sx={{justifyContent: 'left!important'}}>
              {subTheMeasure(text)}
            </Typography>
          </ToolTip>
        </>
      )
    }
    if (checkText && tooltip) {
      return (
        <>
          <Typography className="display-table__title">
            {subTheMeasure(text)}
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
            {subTheMeasure(text)}
          </Typography>
        </ToolTip>
      )
    }
    return (
      <Typography className="display-table__title">
        {subTheMeasure(text)}
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
