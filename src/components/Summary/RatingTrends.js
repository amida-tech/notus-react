import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import {
  Grid, Typography, Rating,
} from '@mui/material';
import TrendDisplay from './TrendDisplay';
import Info from '../Common/Info';
import { mainTrendCreator, sortedTrendsCreator } from './RatingTrendsUtils'

const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

function showStars(activeMeasure) {
  let returnBool = false;

  // Additional stars rules can be added here
  if (activeMeasure.denominator > 30 && activeMeasure.starRating >= 0) {
    returnBool = true;
  }

  return returnBool;
}

function RatingTrends({
  activeMeasure, trends, info, isLoading,
}) {
  const biggestGain = { measure: '', percentChange: undefined };
  const biggestLoss = { measure: '', percentChange: undefined };

  const measureTrend = trends
    .find((trend) => trend.measure === activeMeasure.measure);
  const mainTrend = mainTrendCreator(activeMeasure, info, measureTrend);
  const sortedTrends = sortedTrendsCreator(activeMeasure, trends, measureTrend);

  if (sortedTrends.length > 1) {
    let { measure } = sortedTrends[0];
    biggestGain.measure = info[measure] !== undefined ? info[measure].displayLabel : measure;
    biggestGain.percentChange = sortedTrends[0].percentChange;

    measure = sortedTrends[sortedTrends.length - 1].measure;
    biggestLoss.measure = info[measure]?.displayLabel;
    biggestLoss.percentChange = sortedTrends[sortedTrends.length - 1].percentChange;

    return renderUI(activeMeasure, mainTrend, {
      displayAll: true, biggestGain, biggestLoss,
    }, isLoading);
  }

  return renderUI(activeMeasure, mainTrend, {
    displayAll: false, biggestGain, biggestLoss,
  }, isLoading);
}

const renderUI = (activeMeasure, mainTrend, renderOptions, isLoading) => (
  <Box className="rating-trends">
    {isLoading ? (
      <Grid className="rating-trends__loading-container--rating-trends">
        <Skeleton variant="text" className="rating-trends__loading-skeleton--rating-trends" />
      </Grid>
    )
      : (
        <Box className="rating-trends__main-header-align">
          <Typography variant="h2" className="rating-trends__h2-header">
            Ratings & Trends
          </Typography>
          <Info infoText={ratingTrendsTip} />
        </Box>
      )}
    <Box className="rating-trends__display-box">
      { isLoading ? (
        <Grid className="rating-trends__loading-container--options">
          <Skeleton variant="rectangular" className="rating-trends__loading-skeleton--options" />
          <Skeleton variant="rectangular" className="rating-trends__loading-skeleton--options" />
        </Grid>
      ) : (
        <Box className="rating-trends__panel-box">
          <Grid className={`rating-trends__panel 
          rating-trends__panel${renderOptions.displayAll ? '--width-25' : '--width-50'}`}
          >
            <Grid className="rating-trends__header-align">
              <Typography variant="h3" className="rating-trends__h3-header">
                Star Rating
              </Typography>
              <ToolTip title={starsTip}>
                <HelpIcon className="rating-trends__help-icon" fontSize="small" />
              </ToolTip>
            </Grid>
            {showStars(activeMeasure) ? (
              <Rating
                className="rating-trends__star-rating"
                name="read-only"
                value={activeMeasure.starRating}
                precision={0.5}
                readOnly
              />
            )
              : (
                <Typography className="rating-trends__not-available">
                  N/A
                </Typography>
              )}
            <ToolTip title={activeMeasure.title} arrow>
              <Typography className="rating-trends__star-rating-label">
                {activeMeasure.shortLabel && `(${activeMeasure.shortLabel})`}
              </Typography>
            </ToolTip>
          </Grid>
          <TrendDisplay
            trend={mainTrend}
            percentWidth={renderOptions.displayAll ? 25 : 50}
          />
          <TrendDisplay
            trend={renderOptions.biggestGain}
            percentWidth={renderOptions.displayAll ? 25 : 0}
          />
          <TrendDisplay
            trend={renderOptions.biggestLoss}
            percentWidth={renderOptions.displayAll ? 25 : 0}
          />
        </Box>
      )}
    </Box>
  </Box>
);

RatingTrends.propTypes = {
  activeMeasure: PropTypes.shape({
    measure: PropTypes.string,
    denominator: PropTypes.number,
    shortLabel: PropTypes.string,
    starRating: PropTypes.number,
    title: PropTypes.string,
  }),
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
  isLoading: PropTypes.bool,
}

RatingTrends.defaultProps = {
  activeMeasure: {
    measure: '',
    denominator: 0,
    shortLabel: '',
    starRating: 0,
    title: '',
  },
  trends: [],
  isLoading: true,
}

export default RatingTrends;
