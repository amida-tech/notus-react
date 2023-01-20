import { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Typography, Box,
} from '@mui/material';
import Info from '../Common/Info';
import RatingTrendBox from './RatingTrendBox';
// TrendDisplay

function RatingTrends({
  trends, info, widgetPrefs
}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
  const [boxItems, setBoxOrder] = useState(Object.values(widgetPrefs))

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
    const items = boxItems;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoxOrder(items);
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
          <Droppable droppableId="ratings" direction="horizontal">
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
                {boxItems.map((widget, idx) => {
                  return (
                    <Draggable key={widget.measure} draggableId={widget.measure} index={idx}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <RatingTrendBox
                            widgetPrefs={widget}
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
