import {
  Box, Typography,
} from '@mui/material';
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import ToolTip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

function HeaderCell({
  text, tooltip, ciseCheck
}) {
  const checkText = text === 'Measure' || text === 'Sub-Measure'
  const checkCise = ciseCheck === 'CIS-E' ? 'cise' : 'display'

  //  const overviewExceptions = ['Measures', 'Sub-Measures']
  const memberExceptions = ['MemberID']

  function subTheMeasure(text) {
    return text.split('').includes(':') ? text.split(':')[1] : text
  }

  function headerGenerator() {
    if (memberExceptions.includes(text)) {
      return (
        <ToolTip title={tooltip} arrow>
          <Typography className={`${checkCise}-table__title`} sx={{ justifyContent: 'left!important' }}>
            {subTheMeasure(text)}
          </Typography>
        </ToolTip>
      )
    }
    if (checkText && tooltip) {
      return (
        <>
          <Typography className={`${checkCise}-table__title`}>
            {subTheMeasure(text)}
          </Typography>
          <ToolTip title={tooltip} arrow>
            <HelpIcon className={`${checkCise}-table__help-icon`} />
          </ToolTip>
        </>
      )
    } if (tooltip) {
      return (
        <ToolTip title={tooltip} arrow>
          <Typography className={`${checkCise}-table__title`}>
            {subTheMeasure(text)}
          </Typography>
        </ToolTip>
      )
    }
    return (
      <Typography className={`${checkCise}-table__title`}>
        {subTheMeasure(text)}
      </Typography>
    )
  }
  return (
    <Box className={checkText ? `${checkCise}-table__title-align--left` : `${checkCise}-table__title-align`}>
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
