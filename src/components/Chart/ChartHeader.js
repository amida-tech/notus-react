import PropTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import theme from '../../assets/styles/AppTheme';

function ChartHeader({
  isComposite,
  isLoading,
  handleResetData,
  labelGenerator,
  currentResults,
  activeMeasure,
}) {
  const allMeasureText = (
    <Grid className="chart-container__return-title-display">
      <Typography color={theme.palette?.bluegray.D2} className="chart-container__title">All Measures</Typography>
    </Grid>
  );
  const allMeasureTextWithLinks = (
    <Grid
      className="chart-container__return-link-display"
      onClick={() => {
        handleResetData('ALL MEASURES');
      }}
    >
      <Typography className="chart-container__title">
        <ArrowBackIosIcon className="chart-container__return-icon" />
        All Measures
      </Typography>
      {!isLoading && (
      <Grid className="chart-container__return-measure-display">
        {labelGenerator(
          currentResults.find((result) => result.measure === activeMeasure.measure),
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
