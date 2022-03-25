import React from 'react'
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';
import {
  Grid, Typography,
} from '@mui/material';

function StarRatingDisplay({ activeMeasure }) {
  const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

  const ratingPresentUI = (
    <>
      <Grid className="rating-trends__header-align">
        <Typography variant="h3" className="rating-trends__h3-header">
          Star Rating
        </Typography>
        <ToolTip title={starsTip}>
          <HelpIcon className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Grid>
      <Rating
        className="rating-trends__star-rating"
        name="read-only"
        value={activeMeasure.starRating || 0}
        precision={0.5}
        readOnly
      />
      <Typography className="rating-trends__star-rating-label">
        {activeMeasure.starRating < 0 ? '(Not Applicable)' : activeMeasure.label && `(${activeMeasure.label})`}
      </Typography>

    </>

  )
  const ratingNotPresentUI = (
    <>
      <Grid className="rating-trends__header-align">
        <Typography variant="h3" className="rating-trends__h3-header">
          Star Rating
        </Typography>
        <ToolTip title={starsTip}>
          <HelpIcon className="rating-trends__help-icon" fontSize="small" />
        </ToolTip>
      </Grid>
      <Typography className="trend-display__percent-change">
        N/A
      </Typography>
      <Typography className="rating-trends__star-rating-label">
        {activeMeasure.starRating < 0 ? '(Not Applicable)' : activeMeasure.label && `(${activeMeasure.label})`}
      </Typography>
    </>
  )

  if (activeMeasure.starRating > 0) {
    return ratingPresentUI
  }
  return ratingNotPresentUI
}

StarRatingDisplay.propTypes = {
  activeMeasure: PropTypes.shape({
    measure: PropTypes.string,
    starRating: PropTypes.number,
    label: PropTypes.string,
  }),
}

StarRatingDisplay.defaultProps = {
  activeMeasure: {
    // starRating: 0,
    // label: '',
  },
}
export default StarRatingDisplay
