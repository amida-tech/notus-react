import React from 'react'
import {
  Grid, Tab, Tabs,
} from '@mui/material';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import D3IndicatorByLineSelector from '../../ChartContainer/D3IndicatorByLineSelector'
// import {
//   storeProps,
//   dashboardStateProps,
//   dashboardActionsProps,
// } from '../../ChartContainer/D3Props';

function ReportBuilder({ store }) {

  return (
    <div className="report-builder">
      <h2 className="report-builder__h2-header">Build A Report</h2>
      <p className="report-builder__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <Grid item sx={{ width: '60%', margin:"2rem auto" }}>
        <D3IndicatorByLineSelector
          currentResults={store.currentResults}
          // byLineMeasure={byLineMeasure.measure}
          // handleByLineChange={handleByLineChange}
        />
      </Grid>
      
    </div>

  )
}


export default ReportBuilder;
