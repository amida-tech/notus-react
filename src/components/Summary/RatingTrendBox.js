import PropTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme';
import {
  Title,
  WidgetValue,
  Details,
  measureCheck
} from '../Utilities/RatingTrendsValues';
import { activeMeasureProps } from '../Utilities/PropTypes';

function RatingTrendBox({
  activeMeasure, widgetPrefs, trends, currentResults,
}) {
  return (
    <Box
      sx={{
        outline: `1px solid ${theme.palette?.secondary.light}`,
        backgroundColor: theme.palette?.background.main,
        borderRadius: '1px',
        height: '12rem',
        display: 'grid',
        gridTemplateRows: '1fr 2fr 1fr',
        '& > *': {
          display: 'flex',
          placeContent: 'center',
          alignSelf: 'center',
        },
        '& > span': {
          padding: '0 2rem',
        },
      }}
    >
      <Title
        activeMeasure={activeMeasure}
        preferences={widgetPrefs}
        currentResults={currentResults}
      />
      <WidgetValue
        activeMeasure={activeMeasure}
        preferences={widgetPrefs}
        currentResults={currentResults}
        trends={trends}
        measureCheck={measureCheck(activeMeasure, widgetPrefs)}
      />
      <Details preferences={widgetPrefs} />

    </Box>
  )
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
}

RatingTrendBox.defaultProps = {
  activeMeasure: {},
  trends: {},
  widgetPrefs: {},
  currentResults: {},
}

export default RatingTrendBox;
