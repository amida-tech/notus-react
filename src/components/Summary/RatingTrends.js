import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Typography, Box,
} from '@mui/material';
import Info from '../Common/Info';
import { mainTrendCreator, sortedTrendsCreator } from './RatingTrendsUtils'
import RatingTrendBox from './RatingTrendBox';
// TrendDisplay

function RatingTrends({
  trends, info, widgetPrefs
}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'

  console.log('prefs', widgetPrefs)

  // todo THIS NEEDS TO BE UPDATED WITH TRUE VALUE
  const widgetSpacing = () => {
    let widgetCount = ''
    for (let i = 0; i < Object.keys(widgetPrefs).length; i++) {
      widgetCount += '1fr ';
    }
    return widgetCount.trimEnd()
  }

  return (
    <Box sx={{ m: '0 1rem' }}>
      <Box sx={{ display: 'flex', mb: '1rem' }}>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Ratings & Trends
        </Typography>
        <Info infoText={ratingTrendsTip} />
      </Box>

      {/* <DragDropContext>
        <Droppable droppableId="trends"> */}
          <Box
            sx={{
              display: 'grid',
              gap: '2rem',
              width: 'inherit',
              gridTemplateColumns: widgetSpacing
            }}
          >
            {Object.keys(widgetPrefs).map((widget, idx) => (
              <RatingTrendBox value={idx} widgetPrefs={widgetPrefs} info={info} trends={trends} />
            ))}
          </Box>
        {/* </Droppable>
      </DragDropContext> */}

    </Box>
  )
}

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
}

export default RatingTrends;
