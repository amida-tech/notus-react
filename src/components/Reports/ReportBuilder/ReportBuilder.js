import React, { useState } from 'react'
import {
  Grid, Button,
} from '@mui/material';

import axios from 'axios';
import FileDownload from 'js-file-download'
import {
  storeProps,
} from '../../ChartContainer/D3Props';
import IndicatorByLineReportSelector from './utils/IndicatorByLineReportSelector'

function ReportBuilder({ store }) {
  const [measure, setMeasure] = useState('');

  const handleByLineChange = (e) => {
    setMeasure(e.target.value)
  }

  const handleReport = (e) => {
    e.preventDefault()
    if (measure !== 'measure' || measure !== 'measure') {
      handleRequest(measure)
    }
  }
  const handleRequest = () => {
    axios({
      url: `http://localhost:4000/api/v1/measures/exportCsv?measurementType=${measure}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      FileDownload(res.data, `${measure.toUpperCase()} Report.csv`)
    })
  }

  return (

    <div className="report-builder">
      <h2 className="report-builder__h2-header">Build A Report</h2>
      <p className="report-builder__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <Grid item sx={{ width: '60%', margin: '2rem auto' }}>
        <IndicatorByLineReportSelector
          currentResults={store.currentResults}
          handleByLineChange={handleByLineChange}
        />
      </Grid>
      <Button onClick={(e) => handleReport(e)}>Get Report</Button>
    </div>

  )
}
ReportBuilder.propTypes = {
  store: storeProps,
};
ReportBuilder.defaultProps = {
  store: [],
};

export default ReportBuilder;
