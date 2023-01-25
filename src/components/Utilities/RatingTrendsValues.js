import HelpIcon from '@mui/icons-material/Help';
import {
  Typography, Rating
} from '@mui/material';
import theme from '../../assets/styles/AppTheme';
import ToolTip from '@mui/material/Tooltip';

export const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
export const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

export const Title = ({activeMeasure, preferences, currentResults}) => {
  // handles stars
  if (preferences?.type === 'star') {
    return (
        <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {preferences.measure.toUpperCase()}
        {' '}
        Star Rating
        <ToolTip title={starsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // handles percentages
  // composite percentages
  else if (activeMeasure.measure === 'composite' && preferences?.type === 'percentage') {
    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          whiteSpace: 'nowrap'
        }}
      >
        {preferences.measure.toUpperCase()}
        {' '}
        Score % Change
        <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // measure percentages
  else if (activeMeasure.measure === preferences.measure && preferences?.type === 'percentage') {
    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          whiteSpace: 'nowrap'
        }}
      >
        {preferences.measure.toUpperCase()}
        {' '}
        Score % Change
        <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // sub-measure percentages submeasures
  else if (activeMeasure.measure !== preferences.measure && preferences?.type === 'percentage') {
    const subMeasures = currentResults.find(
      (trend) => trend.measure === activeMeasure.measure,
    ).subScores

    let label = subMeasures?.find((sub) => preferences.measure === sub.measure).label
    label = label.split('').slice(activeMeasure.measure.length + 4).join('')

    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          width: '20rem'
        }}
      >
        {label.toUpperCase()}
        {' '}
        Score % Change
        <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  } else {
    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          whiteSpace: 'nowrap'
        }}
      >
        Undefined trend
      </Typography>
    )
  }
    
}

export const WidgetValue = ({activeMeasure, preferences, currentResults, trends}) => {
  if (activeMeasure.measure === 'composite' && preferences.type === 'percentage') {
    const percentValue = trends.find(
      (trend) => trend.measure === preferences.measure.toLowerCase(),
    ).percentChange
    let percentColor = theme.palette?.text.disabled
    if (percentValue > 0) {
      percentColor = theme.palette?.success.main
    } else if (percentValue < 0) {
      percentColor = theme.palette?.error.main
    }
    return (
      <Typography color={percentColor} variant="h4">
        {percentValue < 0 ? percentValue : `+${percentValue}`}
        {' '}
        %
      </Typography>
    )
  } else if (preferences.type === 'star' || activeMeasure.measure === 'composite' && preferences.type === 'star') {
    const starValue = currentResults.find(
      (trend) => trend.measure === preferences.measure.toLowerCase(),
    ).starRating
    return (
      <Rating
        name="read-only"
        value={starValue}
        precision={0.5}
        sx={{ fontSize: 'xxx-large' }}
        readOnly
      />
    )
  } else if (activeMeasure.measure !== 'composite' && activeMeasure.measure !== preferences.measure) {
    const percentValue = trends.find(
      (trend) => activeMeasure.measure === trend.measure
    ).subScoreTrends.find(
      (trend) => trend.measure === preferences.measure
    ).percentChange
    let percentColor = theme.palette?.text.disabled
    if (percentValue > 0) {
      percentColor = theme.palette?.success.main
    } else if (percentValue < 0) {
      percentColor = theme.palette?.error.main
    }
    return (
      <Typography color={percentColor} variant="h4">
        {percentValue < 0 ? percentValue : `+${percentValue}`}
        {' '}
        %
      </Typography>
    )
  }
  
  return (
    <Typography>
      Undefined component
    </Typography>
  )
}

export const Details = ({preferences}) => {
  // props: measure, time period?
  // either "over the past week" or measure title
  if (preferences.type === 'percentage') {
    return (
      <Typography>
        {preferences.measure.toUpperCase()}
      </Typography>
    )
  } else if (preferences.type === 'star') {
    return (
      <Typography>
        (over the past week)
      </Typography>
    )
    
  }
  return undefined;
}

export const submeasureResults = (activeMeasure, trends) => {
  const values = {
    0: {
      type: 'star',
      measure: activeMeasure.measure
    },
  }
  // add submeasures

  const subScoreTrends = trends.find(
      (trend) => trend.measure === activeMeasure.measure
    ).subScoreTrends

  subScoreTrends.forEach((trend, idx) => {
    Object.assign(values, {
      [idx + 1] :
        {type: 'percentage', measure: trend.measure}
    })
  })

  return values
}
