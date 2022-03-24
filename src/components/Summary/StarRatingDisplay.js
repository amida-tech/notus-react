import React from 'react'
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import {
  Typography,
} from '@mui/material';

function StarRatingDisplay({ activeMeasure }) {
  if (activeMeasure.starRating < 0) {
    return (
      <Typography variant="h3" className="rating-trends__h3-header">
        N/A
      </Typography>
    )
  } return (
    <Rating
      className="rating-trends__star-rating"
      name="read-only"
      value={activeMeasure.starRating || 0}
      precision={0.5}
      readOnly
    />
  )
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
