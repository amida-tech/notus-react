import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Grid, Typography, Rating, Box,
} from '@mui/material';
import ToolTip from '@mui/material/Tooltip';
import theme from '../../assets/styles/AppTheme';

function RatingTrendBox({value, widgetPrefs, info}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
  const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

  const titleValue = (preferences, value, info) => {
    // props: measure, rating type
    console.log('info', value)

    if (preferences?.type === 'star') {
      return (
        <Typography
            variant="h6"
            sx={{
              padding: '1rem',
              fontWeight: 700
            }}
          >
            {preferences.measure.toUpperCase()} Star Rating
            <ToolTip title={starsTip} sx={{ alignSelf: 'center' }}>
              <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
            </ToolTip>
        </Typography>
      )
    } else if (preferences?.type === 'percentage') {
      return (
        <Typography
          variant="h6"
          sx={{
            padding: '1rem',
            fontWeight: 700
          }}
        >
          {preferences.measure.toUpperCase()} Score % Change
          <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
            <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
          </ToolTip>
        </Typography>
      )
    }
    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700
        }}
      >
        Undefined trend
      </Typography>
    )
  }

  const boxValue = () => {
    // props: display value of rating
    return (
      <Typography>
        + 0 %
      </Typography>
    )
  }

  const detailValue = (preferences) => {
    // props: measure, time period?
    // either "over the past week" or measure title
    if (preferences.type === 'percentage') {
      return `(${preferences.measure.toUpperCase()})`
    } else if (preferences.type === 'star') {
      return '(over the past week)'
    }
    return undefined;
  }

  return (
    <Box
      sx={{
        outline: `1px solid ${theme.palette?.secondary.light}`,
        borderRadius: '1px',
        height: '10rem',
        display: 'grid',
        gridTemplateRows: '1fr 2fr 1fr',
        '& > *': {
          display: 'flex',
          placeContent: 'center',
        }
      }}
    >
      {titleValue(widgetPrefs[value], value, info)}
      {boxValue(widgetPrefs[value], info)}
      <Typography>
        {detailValue(widgetPrefs[value])}
      </Typography>

    </Box>
  )
}

RatingTrendBox.propTypes = {
  }
  
  RatingTrendBox.defaultProps = {
  }
  
  export default RatingTrendBox;