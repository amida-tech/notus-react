import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { DatastoreContext } from '../context/DatastoreProvider';
import D3Container from '../components/ChartContainer';
import Banner from '../components/Common/Banner';
import RatingTrends from '../components/Summary/RatingTrends';
import { defaultActiveMeasure } from '../components/ChartContainer/D3Props';

export default function Dashboard() {
  const { datastore } = useContext(DatastoreContext);
  const [filterDrawerOpen, toggleFilterDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMeasure, setActiveMeasure] = useState(defaultActiveMeasure);
  const { measure } = useParams();

  useEffect(() => {
    if (datastore.currentResults !== undefined) {
      const currentMeasure = measure || 'composite';
      setActiveMeasure(datastore.currentResults.find(
        (result) => result.measure === currentMeasure,
      ) || defaultActiveMeasure);
      setIsLoading(datastore.isLoading);
    }
  }, [datastore.currentResults, datastore.isLoading, measure]);

  // If control needs to be shared across multiple components,
  // add them through useState above and append them to these.
  const dashboardState = {
    filterDrawerOpen,
    isLoading,
  };

  const dashboardActions = {
    toggleFilterDrawer,
    setActiveMeasure,
  };

  return (
    <Box className="dashboard">
      <Paper elevation={0} className="dashboard__paper">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={4}>
            <Grid item className="dashboard__summary" sm={12}>
              <Banner headerText="HEDIS Dashboard" lastUpdated={datastore.lastUpdated} />
              <RatingTrends
                activeMeasure={activeMeasure}
                trends={datastore.trends}
                info={datastore.info}
              />
            </Grid>
            <Grid item xs={12}>
              <D3Container
                store={datastore}
                activeMeasure={activeMeasure}
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
