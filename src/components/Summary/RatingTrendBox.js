import PropTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import {
  Title,
  DisplayValue,
  Footer,
  measureChecker,
} from '../Utilities/RatingTrendsValues';
import { ratingTrendsBox } from '../../assets/styles/RatingTrends.style';
import { activeMeasureProps } from '../Utilities/PropTypes';

function RatingTrendBox({
  activeMeasure, widgetPrefs, trends, currentResults, order,
}) {
  return (
    <Box
      sx={ratingTrendsBox}
    >
      <Title
        activeMeasure={activeMeasure}
        preferences={widgetPrefs}
        currentResults={currentResults}
        order={order}
      />
      <DisplayValue
        activeMeasure={activeMeasure}
        preferences={widgetPrefs}
        currentResults={currentResults}
        trends={trends}
        measureCheck={measureChecker(activeMeasure, widgetPrefs)}
      />
      <Footer preferences={widgetPrefs} />

    </Box>
  );
}

RatingTrendBox.propTypes = {
  activeMeasure: activeMeasureProps,
  trends: PropTypes.arrayOf(PropTypes.shape({
    measure: PropTypes.string,
    precentChange: PropTypes.number,
    subScoreTrends: PropTypes.arrayOf(PropTypes.shape({
      measure: PropTypes.string,
      percentChange: PropTypes.number,
    })),
  })),
  widgetPrefs: PropTypes.shape({
    type: PropTypes.string,
    measure: PropTypes.string,
  }),
  currentResults: PropTypes.arrayOf(PropTypes.shape({})),
  order: PropTypes.number,
};

RatingTrendBox.defaultProps = {
  activeMeasure: {},
  trends: {},
  widgetPrefs: {},
  currentResults: {},
  order: 0,
};

export default RatingTrendBox;
