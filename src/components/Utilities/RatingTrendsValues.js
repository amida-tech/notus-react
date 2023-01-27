import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Typography, Rating,
} from '@mui/material';
import ToolTip from '@mui/material/Tooltip';
import theme from '../../assets/styles/AppTheme';
import {
  activeMeasureProps, currentResultsProps, trendsProps, widgetPrefsProps,
} from './PropTypes';

export const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
export const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

export function Title({ activeMeasure, preferences, currentResults }) {
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
        {`${preferences.measure.toUpperCase()} Star Rating`}
        <ToolTip title={starsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // handles percentages
  // composite percentages
  if (activeMeasure.measure === 'composite' && preferences?.type === 'percentage') {
    return (
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {`${preferences.measure.toUpperCase()} Score % Change`}
        <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // measure percentages
  if (activeMeasure.measure === preferences.measure && preferences?.type === 'percentage') {
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
        Score % Change
        <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
          <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Typography>
    )
  }
  // sub-measure percentages submeasures
  if (activeMeasure.measure !== preferences.measure && preferences?.type === 'percentage') {
    const subMeasures = currentResults.find(
      (trend) => trend.measure === activeMeasure.measure,
    ).subScores

    let label = subMeasures?.find((sub) => preferences.measure === sub.measure).label
    label = `${label.split('').slice(activeMeasure.measure.length + 4).join('')} Score % Change`

    // submeasure titles can be super long so we're making the font size
    // slightly smaller for massive ones
    const charCount = label.split('').length > 45

    return (
      <Typography
        variant="h6"
        sx={{
          padding: '.5rem',
          fontWeight: 700,
          width: '85%',
          height: 'fit-content',
          textAlign: 'center',
          justifySelf: 'center',
          fontSize: charCount ? '1rem' : '1.2rem',
        }}
      >
        {label}
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
        fontWeight: 700,
        whiteSpace: 'nowrap',
        height: 'fit-content',
      }}
    >
      Undefined trend
    </Typography>
  )
}

export function WidgetValue({
  activeMeasure, preferences, currentResults, trends,
}) {
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
      <Typography color={percentColor} variant="h4" sx={{ height: 'fit-content', padding: '0' }}>
        {percentValue < 0 ? percentValue : `+ ${percentValue}`}
        {' '}
        %
      </Typography>
    )
  } if (preferences.type === 'star' || (activeMeasure.measure === 'composite' && preferences.type === 'star')) {
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
  } if (activeMeasure.measure !== 'composite' && activeMeasure.measure !== preferences.measure) {
    const percentValue = trends.find(
      (trend) => activeMeasure.measure === trend.measure,
    ).subScoreTrends.find(
      (trend) => trend.measure === preferences.measure,
    ).percentChange
    let percentColor = theme.palette?.text.disabled
    if (percentValue > 0) {
      percentColor = theme.palette?.success.main
    } else if (percentValue < 0) {
      percentColor = theme.palette?.error.main
    }
    return (
      <Typography color={percentColor} variant="h4" sx={{ height: 'fit-content', padding: '0' }}>
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

export function Details({ preferences }) {
  // props: measure, time period?
  // either "over the past week" or measure title
  if (preferences.type === 'percentage') {
    return (
      <Typography sx={{ height: 'fit-content' }}>
        {preferences.measure.toUpperCase()}
      </Typography>
    )
  } if (preferences.type === 'star') {
    return (
      <Typography sx={{ height: '3rem', alignItems: 'center' }}>
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
      measure: activeMeasure.measure,
    },
  }
  // add submeasures

  const { subScoreTrends } = trends.find(
    (trend) => trend.measure === activeMeasure.measure,
  )

  subScoreTrends.forEach((trend, idx) => {
    Object.assign(values, {
      [idx + 1]:
        { type: 'percentage', measure: trend.measure },
    })
  })

  return values
}

Title.propTypes = {
  activeMeasure: activeMeasureProps,
  trends: PropTypes.shape({
    measure: PropTypes.string,
    precentChange: PropTypes.number,
    subScoretrend: PropTypes.arrayOf(PropTypes.shape({
      measure: PropTypes.string,
      percentChange: PropTypes.number,
    })),
  }),
  preferences: widgetPrefsProps,
  currentResults: PropTypes.arrayOf(PropTypes.shape({})),
}
WidgetValue.propTypes = {
  activeMeasure: activeMeasureProps,
  currentResults: currentResultsProps,
  trends: trendsProps,
  preferences: widgetPrefsProps,
}
Details.propTypes = {
  preferences: widgetPrefsProps,
}

Title.defaultProps = {
  activeMeasure: {},
  trends: {},
  preferences: {},
  currentResults: {},
}
WidgetValue.defaultProps = {
  activeMeasure: {},
  currentResults: {},
  trends: {},
  preferences: {},
}
Details.defaultProps = {
  preferences: {},
}
