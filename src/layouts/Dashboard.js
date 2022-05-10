import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DatastoreContext } from '../context/DatastoreProvider';
import D3Container from '../components/ChartContainer';
import Banner from '../components/Summary/Banner';
import RatingTrends from '../components/Summary/RatingTrends';

const defaultActiveMeasure = {
  measure: '',
  denominator: 0,
  shortLabel: '',
  starRating: 0,
  title: '',
};

export default function Dashboard() {
  const { datastore } = useContext(DatastoreContext);
  const [filterDrawerOpen, toggleFilterDrawer] = useState(false);
  const [activeMeasure, setActiveMeasure] = useState(defaultActiveMeasure);

  useEffect(() => {
    if (datastore.currentResults !== undefined) {
      setActiveMeasure(datastore.currentResults.find((result) => result.measure === 'composite') || defaultActiveMeasure);
    }
  }, [datastore.currentResults]);

  // If control needs to be shared across multiple components,
  // add them through useState above and append them to these.
  const dashboardState = {
    filterDrawerOpen,
  };

  const dashboardActions = {
    toggleFilterDrawer,
    setActiveMeasure,
  };

  return (
    <Box className="dashboard">
      <Paper className="dashboard__paper">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={4}>
            <Grid item className="dashboard__summary" sm={12}>
              <Banner lastUpdated={datastore.lastUpdated} />
              <RatingTrends
                activeMeasure={activeMeasure}
                trends={datastore.trends}
                info={datastore.info}
              />
            </Grid>
            <Grid item xs={12}>
              <D3Container
                store={datastore}
                dashboardState={dashboardState}
                dashboardActions={dashboardActions}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}
