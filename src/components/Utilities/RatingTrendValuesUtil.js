import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip'; import {
  Typography, Rating,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme';
import { ratingTrendsTitle } from 'assets/styles/RatingTrends.style';

export const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.';
export const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

export function starTitle(preferences) {
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
  );
}

export function compositePercentTitle(preferences) {
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
  );
}

export function measurePercentTitle(preferences) {
  return (
    <Typography
      variant="h6"
      sx={ratingTrendsTitle(preferences.measure)}
    >
      {` ${preferences.measure.toUpperCase()} Score % Change `}
      <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center', margin: '.2rem' }}>
        <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
      </ToolTip>
    </Typography>
  );
}

export function submeasurePercentTitle(activeMeasure, preferences, currentResults) {
  const subMeasures = currentResults.find(
    (trend) => trend.measure === activeMeasure.measure,
  ).subScores;

  let label = subMeasures?.find((sub) => preferences.measure === sub.measure).label;
  label = `${label.split('').slice(activeMeasure.measure.length + 4).join('')} Score % Change`;

  return (
    <Typography
      variant="h6"
      sx={ratingTrendsTitle(label)}
    >
      {label}
      <ToolTip title={ratingTrendsTip} sx={{ alignSelf: 'center' }}>
        <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
      </ToolTip>
    </Typography>
  );
}

export function percentDisplayValue(trends, preferences, activeMeasure, measureCheck) {
  let percentValue
  if (measureCheck.submeasureCheck) {
    percentValue = trends.find(
      (trend) => trend.measure === activeMeasure.measure.toLowerCase()
    ).subScoreTrends.find(
      (sub) => sub.measure === preferences.measure
    ).percentChange
  } else {
    percentValue = trends.find(
      (trend) => trend.measure === preferences.measure.toLowerCase(),
    ).percentChange;
  }

  let percentColor = theme.palette?.text.disabled;
  if (percentValue > 0) {
    percentColor = theme.palette?.success.main;
  } else if (percentValue < 0) {
    percentColor = theme.palette?.error.main;
  }
  return (
    <Typography color={percentColor} variant="h4" sx={{ height: 'fit-content', padding: '0' }}>
      {percentValue < 0 ? percentValue : `+ ${percentValue}`}
      {' '}
      %
    </Typography>
  );
}

export function starDisplayValue(currentResults, preferences) {
  const starValue = currentResults.find(
    (trend) => trend.measure === preferences.measure.toLowerCase(),
  ).starRating;
  return (
    <Rating
      name="read-only"
      value={starValue}
      precision={0.5}
      sx={{ fontSize: 'xxx-large' }}
      readOnly
    />
  );
}

export function submeasurePercentDisplayValue(trends, activeMeasure, preferences) {
  const percentValue = trends.find(
    (trend) => activeMeasure.measure === trend.measure,
  ).subScoreTrends.find(
    (trend) => trend.measure === preferences.measure,
  ).percentChange;
  let percentColor = theme.palette?.text.disabled;
  if (percentValue > 0) {
    percentColor = theme.palette?.success.main;
  } else if (percentValue < 0) {
    percentColor = theme.palette?.error.main;
  }
  return (
    <Typography color={percentColor} variant="h4" sx={{ height: 'fit-content', padding: '0' }}>
      {percentValue < 0 ? percentValue : `+${percentValue}`}
      {' '}
      %
    </Typography>
  );
}

export function percentageFooter(preferences) {
  return (
    <Typography sx={{ height: 'fit-content' }}>
      {preferences.measure.toUpperCase()}
    </Typography>
  );
}

export function starFooter() {
  return (
    <Typography sx={{ height: '3rem', alignItems: 'center' }}>
      (over the past week)
    </Typography>
  );
}
