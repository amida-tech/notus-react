import { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Typography, Box,
} from '@mui/material';
import Info from '../Common/Info';
import { mainTrendCreator, sortedTrendsCreator } from './RatingTrendsUtils'
import RatingTrendBox from './RatingTrendBox';
import theme from 'assets/styles/AppTheme';
// TrendDisplay

function RatingTrends({
  trends, info, widgetPrefs
}) {
  const [ratingBoxes, setRatingBoxes] = useState(Object.keys(widgetPrefs))
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

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(Object.keys(widgetPrefs));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <Box sx={{ m: '0 1rem' }}>
      <Box sx={{ display: 'flex', mb: '1rem' }}>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Ratings & Trends
        </Typography>
        <Info infoText={ratingTrendsTip} />
      </Box>

          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="ratings">
            {(provided) => (
              <Box
                sx={{
                  display: 'grid',
                  gap: '2rem',
                  width: 'inherit',
                  gridTemplateColumns: widgetSpacing,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Object.keys(widgetPrefs).map((widget, idx) => {
                  return (
                    <Draggable key={widget} draggableId={widget} index={idx}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <RatingTrendBox
                            value={idx}
                            widgetPrefs={widgetPrefs}
                            info={info}
                            trends={trends}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

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
