// These lint ignores relate to a library which specifies to be used this way
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Typography, Box,
} from '@mui/material';
import Info from '../Common/Info';
import RatingTrendBox from './RatingTrendBox';
import { DatastoreContext } from '../../context/DatastoreProvider';
// TrendDisplay

function RatingTrends({
  trends, widgetPrefs,
}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
  const [boxItems, setBoxOrder] = useState(Object.values(widgetPrefs))
  const { datastore, datastoreActions } = useContext(DatastoreContext);

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
    delete datastore.preferences.ratingTrendsWidget;
    datastoreActions?.setPreferences({ ratingTrendsWidget: items, ...datastore.preferences })
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
              {boxItems.map((widget, idx) => (
                <Draggable key={widget.measure} draggableId={widget.measure} index={idx}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <RatingTrendBox
                        widgetPrefs={widget}
                        trends={trends}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

    </Box>
  )
}

RatingTrends.propTypes = {
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
  })
}

RatingTrends.defaultProps = {
  trends: {},
  widgetPrefs: {},
}

export default RatingTrends;
