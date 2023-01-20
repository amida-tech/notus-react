import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Grid, Typography, Rating, Box,
} from '@mui/material';
import ToolTip from '@mui/material/Tooltip';
import theme from '../../assets/styles/AppTheme';

function RatingTrendBox({value, widgetPrefs, info, trends}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
  const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

  const titleValue = (preferences) => {
    // props: measure, rating type

    if (preferences?.type === 'star') {
      return (
        <>
          {preferences.measure.toUpperCase()} Star Rating
          <ToolTip title={starsTip} sx={{ alignSelf: 'center' }}>
            <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
          </ToolTip>
        </>
      )
    } else if (preferences?.type === 'percentage') {
      return (
        <>
          {preferences.measure.toUpperCase()} Score % Change
          <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
            <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
          </ToolTip>
        </>
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

  const boxValue = (preferences, info) => {
    // props: display value of rating
    console.log('BOX VALUE > prefs/trends:', {preferences, trends})
    if (preferences.type === 'percentage') {
      const percentValue = trends.find(trend => trend.measure === preferences.measure.toLowerCase()).percentChange
      let percentColor = 'theme.palette?.text.disabled'
      if (percentValue > 0) {
        percentColor = 'theme.palette?.success.main'
      } else if (percentValue < 0) {
        percentColor = 'theme.palette?.error.main'
      }

      return (
        <Typography color={percentColor} variant="h4">
          {percentValue < 0 ? '- ' + percentValue : '+ ' + percentValue} %
        </Typography>
      )
    }
    
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
      <Typography
            variant="h6"
            sx={{
              padding: '1rem',
              fontWeight: 700
            }}
      >
        {titleValue(widgetPrefs[value], value, info)}
      </Typography>

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