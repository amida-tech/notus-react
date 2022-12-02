import PropTypes from 'prop-types';
import {
  Grid, Typography,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme'

function TrendDisplay({ trend, percentWidth }) {
  let panelClass = 'trend-display--hide';
  if (percentWidth === 25) {
    panelClass = 'trend-display--width-25';
  } else if (percentWidth === 50) {
    panelClass = 'trend-display--width-50';
  }

  let trendClass = theme.palette?.bluegray.D4;
  let trendValue = 'N/A';
  if (trend.percentChange !== undefined) {
    if (trend.percentChange >= 0) {
      trendClass = theme.palette?.success;
      trendValue = `+${trend.percentChange} %`
    } else {
      trendClass = theme.palette?.error;
      trendValue = `-${Math.abs(trend.percentChange)} %`
    }
  }

  return (
    <Grid sx={{ border: `1px solid ${theme.palette?.bluegray.L3}` }} className={`trend-display ${panelClass}`}>
      <Typography variant="h3" className="trend-display__h3-header">
        {`${trend.measure} Score % Change`}
      </Typography>
      <Typography color={trendClass} className="trend-display__percent-change">
        { trendValue }
      </Typography>
      <Typography>
        (over the past week)
      </Typography>
    </Grid>
  )
}

TrendDisplay.propTypes = {
  trend: PropTypes.shape({
    measure: PropTypes.string,
    percentChange: PropTypes.number,
  }),
  percentWidth: PropTypes.number,
}

TrendDisplay.defaultProps = {
  trend: {
    measure: '',
  },
  percentWidth: 0,
}

export default TrendDisplay;
