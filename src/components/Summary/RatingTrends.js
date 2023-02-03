// These lint ignores relate to a library which specifies to be used this way
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import { useState, useContext } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  Typography, Box,
} from '@mui/material';
import {
  activeMeasureProps, currentResultsProps, trendsProps, widgetPrefsProps,
} from '../Utilities/PropTypes';
import Info from '../Common/Info';
import RatingTrendBox from './RatingTrendBox';
import { DatastoreContext } from '../../context/DatastoreProvider';
import { submeasureResults } from '../Utilities/RatingTrendsValues';
// TrendDisplay

function RatingTrends({
  currentResults, activeMeasure, trends, widgetPrefs,
}) {
  const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.';
  const [boxItems, setBoxOrder] = useState(Object.values(widgetPrefs));
  const { datastore, datastoreActions } = useContext(DatastoreContext);

  const widgetSpacing = () => {
    if (activeMeasure.measure === 'composite') {
      return `repeat(${Object.keys(widgetPrefs).length}, 1fr)`;
    }

    const subscoresLength = trends.find(
      (trend) => activeMeasure.measure === trend.measure,
    ).subScoreTrends.length;

    return `repeat(${subscoresLength + 1}, 1fr)`;
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = boxItems;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoxOrder(items);
    delete datastore.preferences.ratingTrends;
    datastoreActions?.setPreferences({ ratingTrends: items, ...datastore.preferences });
  }

  if (activeMeasure.measure !== 'composite') {
    const measurePreferences = submeasureResults(activeMeasure, trends);
    return (
      <Box sx={{ m: '0 1rem' }}>
        <Box sx={{ display: 'flex', mb: '1rem' }}>
          <Typography variant="h4" sx={{ fontWeight: '600' }}>
            Ratings & Trends
          </Typography>
          <Info infoText={ratingTrendsTip} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: '1rem',
            width: 'inherit',
            gridTemplateColumns: widgetSpacing,
            overflowX: 'auto',
            overflowY: 'unset',
            padding: '.5rem',
            '& > div': {
              width: '20rem',
              justifyContent: 'center',
              '& > h4': {
                alignSelf: 'end',
              },
              '& > p': {
                margin: '1rem 0',
                height: 'unset',
                alignItems: 'self-end',
              },
              '& > span': {
                marginBottom: '-2rem',
              },
            },
          }}
        >
          {Object.values(measurePreferences).map((pref, idx) => (
            <RatingTrendBox
              key={pref.measure}
              activeMeasure={activeMeasure}
              widgetPrefs={measurePreferences[idx]}
              trends={trends}
              currentResults={currentResults}
            />
          ))}

        </Box>

      </Box>
    );
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
                gap: '1rem',
                width: 'inherit',
                gridTemplateColumns: widgetSpacing,
                padding: '1rem',
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
                        activeMeasure={activeMeasure}
                        widgetPrefs={widget}
                        trends={trends}
                        currentResults={currentResults}
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
  );
}

RatingTrends.propTypes = {
  activeMeasure: activeMeasureProps,
  trends: trendsProps,
  widgetPrefs: widgetPrefsProps,
  currentResults: currentResultsProps,
};

RatingTrends.defaultProps = {
  activeMeasure: {},
  trends: {},
  widgetPrefs: {},
  currentResults: {},
};

export default RatingTrends;
