import React, { useContext } from 'react'
import { Box, Grid } from '@mui/material';
import ReportsBanner from '../components/Summary/ReportsBanner'
import ReportBuilder from '../components/Reports/ReportBuilder'
import SavedQueries from '../components/Reports/SavedQueries'
import { DatastoreContext } from '../context/DatastoreProvider';

export default function Reports() {
  const { datastore } = useContext(DatastoreContext);
  return (
    <Box className="reports">
      <ReportsBanner />
      <Grid className="reports__display">
        { process.env.REACT_APP_MVP_SETTING === 'false' && <SavedQueries /> }
        <ReportBuilder store={datastore} />
      </Grid>
    </Box>
  )
}
