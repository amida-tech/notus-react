import React from 'react';
import PropTypes from 'prop-types';
import ToolTip from '@mui/material/Tooltip';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

function SaraswatiToolTip(props) {
  const { title, children } = props;
  return (
    <StyledEngineProvider injectFirst>
      <ToolTip title={title} arrow classes={{ tooltip: '.MuiTooltip-tooltip', arrow: '.MuiTooltip-arrow' }}>
        { children }
      </ToolTip>
    </StyledEngineProvider>
  )
}

SaraswatiToolTip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
}

SaraswatiToolTip.defaultProps = {
  children: [],
  title: '',
}

export default SaraswatiToolTip;
