import PropTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';

import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ChartHeader({
  isComposite,
  history,
  isLoading,
  labelGenerator,
  currentResults,
  activeMeasure,
  handleReset,
}) {
  const allMeasureText = (
    <Grid className="d3-container__return-title-display">
      <Typography className="d3-container__title d3-container__title--inactive">All Measures</Typography>
    </Grid>
  )
  const allMeasureTextWithLinks = (
    <Grid
      className="d3-container__return-link-display"
      onClick={() => {
        handleReset()
        history.push('/');
      }}
    >
      <Typography className="d3-container__title">
        <ArrowBackIosIcon className="d3-container__return-icon" />
        All Measures
      </Typography>
      {!isLoading && (
      <Grid className="d3-container__return-measure-display">
        <DisabledByDefaultRoundedIcon className="d3-container__cancel-icon" />
        {labelGenerator(
          currentResults.find((result) => result.measure === activeMeasure.measure),
        )}
      </Grid>
      )}
    </Grid>
  )
  if (isComposite) {
    return allMeasureText
  }
  return allMeasureTextWithLinks
}

ChartHeader.propTypes = {
  isComposite: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
    any: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
  labelGenerator: PropTypes.func,
  currentResults: PropTypes.arrayOf(PropTypes.shape({})),
  activeMeasure: PropTypes.shape({
    measure: PropTypes.string,
    denominator: PropTypes.number,
    shortLabel: PropTypes.string,
    starRating: PropTypes.number,
    title: PropTypes.string,
  }),
  handleReset: PropTypes.func,
}

ChartHeader.defaultProps = {
  isComposite: true,
  history: {},
  isLoading: true,
  labelGenerator: () => undefined,
  currentResults: [],
  activeMeasure: {
    measure: '',
    denominator: 0,
    shortLabel: '',
    starRating: 0,
    title: '',
  },
  handleReset: () => undefined,
}

export default ChartHeader
