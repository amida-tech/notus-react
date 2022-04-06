import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import {
  Button, Grid, Typography, Rating,
} from '@mui/material';
import TrendDisplay from './TrendDisplay';
import Info from './Info';

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

function RatingTrends({ activeMeasure, trends, info }) {
  const mainTrend = { measure: '', percentChange: undefined };
  const biggestGain = { measure: '', percentChange: undefined };
  const biggestLoss = { measure: '', percentChange: undefined };
  let sortedTrends = [];

  const measureTrend = trends
    .find((trend) => trend.measure === activeMeasure.measure);

  mainTrend.measure = info[activeMeasure.measure] !== undefined ? info[activeMeasure.measure].displayLabel : '';
  mainTrend.percentChange = measureTrend === undefined ? undefined : measureTrend.percentChange;
  if (activeMeasure.measure === 'composite') {
    sortedTrends = trends
      .filter((trend) => trend.measure !== 'composite')
      .sort((a, b) => b.percentChange - a.percentChange);
  } else if (activeMeasure.measure) {
    sortedTrends = measureTrend.subScoreTrends
      .sort((a, b) => b.percentChange - a.percentChange);
  }

  if (sortedTrends.length > 1) {
    let { measure } = sortedTrends[0];
    biggestGain.measure = info[measure] !== undefined ? info[measure].displayLabel : measure;
    biggestGain.percentChange = sortedTrends[0].percentChange;

    measure = sortedTrends[sortedTrends.length - 1].measure;
    biggestLoss.measure = info[measure].displayLabel;
    biggestLoss.percentChange = sortedTrends[sortedTrends.length - 1].percentChange;

    return renderUI(activeMeasure, mainTrend, {
      displayAll: true, biggestGain, biggestLoss,
    });
  }

  return renderUI(activeMeasure, mainTrend, {
    displayAll: false, biggestGain, biggestLoss,
  });
}

const renderUI = (activeMeasure, mainTrend, renderOptions) => (
  <Box className="rating-trends">
    <Box className="rating-trends__main-header-align">
      <Typography variant="h2" className="rating-trends__h2-header">
        Ratings & Trends
      </Typography>
      <Info infoText={ratingTrendsTip} />
    </Box>
    <Box className="rating-trends__display-box">
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
              value={activeMeasure.starRating || 0}
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
      <Box className="rating-trends__button-panel">
        {
          process.env.REACT_APP_MVP_SETTING === 'false'
          && (
            <Button
              className="rating-trends__view-rating-details-button"
            >
              View Rating Details
            </Button>
          )
        }
      </Box>
    </Box>
  </Box>
);

RatingTrends.propTypes = {
  activeMeasure: PropTypes.shape({
    measure: PropTypes.string,
    starRating: PropTypes.number,
    label: PropTypes.string,
  }),
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
}

RatingTrends.defaultProps = {
  activeMeasure: {
    starRating: 0,
    label: '',
  },
  trends: [],
}

export default RatingTrends;
