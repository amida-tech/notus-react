import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Grid, Typography, Rating, Box,
} from '@mui/material';
import ToolTip from '@mui/material/Tooltip';
import theme from '../../assets/styles/AppTheme';

const title = 'Star Rating'

function RatingTrendBox({}) {
  return (
    <Box>
      <Typography variant="h6">
        {title}
      </Typography>
    </Box>
  )
}

RatingTrendBox.propTypes = {
    info: PropTypes.string
  }
  
  RatingTrendBox.defaultProps = {
    info: ''
  }
  
  export default RatingTrendBox;