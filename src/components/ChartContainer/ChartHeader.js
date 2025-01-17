import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';

function ChartHeader({
  isComposite,
  isLoading,
  handleResetData,
  labelGenerator,
  currentResults,
  activeMeasure,
}) {
  const allMeasureText = (
    <Grid className='d3-container__return-title-display'>
      <Typography variant='h6'>All Measures</Typography>
    </Grid>
  );
  const allMeasureTextWithLinks = (
    <Grid
      className='d3-container__return-link-display'
      onClick={() => {
        handleResetData('ALL MEASURES');
      }}
    >
      <Typography className='d3-container__title'>
        <ArrowBackIosIcon className='d3-container__return-icon' />
        All Measures
      </Typography>
      {!isLoading && (
        <Grid className='d3-container__return-measure-display'>
          {labelGenerator(
            currentResults.find(
              (result) => result.measure === activeMeasure.measure,
            ),
          )}
        </Grid>
      )}
    </Grid>
  );
  if (isComposite) {
    return allMeasureText;
  }
  return allMeasureTextWithLinks;
}

ChartHeader.propTypes = {
  isComposite: PropTypes.bool,
  handleResetData: PropTypes.func,
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
};

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
  handleResetData: () => undefined,
};

export default ChartHeader;
