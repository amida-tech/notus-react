import React, { useContext } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { DatastoreContext } from '../../context/DatastoreProvider';

function ReportsBanner() {
  const { datastore } = useContext(DatastoreContext);

  return (
    <Box className="reports-banner">
      <Typography variant="h1" className="reports-banner__header">
        HEDIS Reports
      </Typography>
      <Box className="reports-banner__update-box">
        <Typography className="reports-banner__update-label">
          Last Updated:
        </Typography>
        <Typography className="reports-banner__update-time">
          {' '}
          {datastore.lastUpdated}
        </Typography>
      </Box>
    </Box>
  );
}

export default ReportsBanner;
