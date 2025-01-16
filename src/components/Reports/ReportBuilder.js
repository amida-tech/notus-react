import { Box, Grid, Typography } from '@mui/material';
import { storeProps } from '../ChartContainer/D3Props';
import { useEffect, useState } from 'react';
import Banner from 'components/Common/Banner';
import env from '../../env';
import MeasureSelector from '../Common/MeasureSelector';

function ReportBuilder({ store }) {
  const [measure, setMeasure] = useState('');

  useEffect(() => {
    if (store.currentResults !== undefined) {
      setMeasure(store.currentResults[0]?.measure);
    }
  }, [store]);

  const handleMeasureChange = (e) => {
    setMeasure(e.target.value);
  };

  return (
    <Box className='report-builder'>
      <div>
        <Banner headerText='HEDIS Reports' />
        <Typography variant='h6'>Build A Report</Typography>
        <Typography className='report-builder__text'>
          Generate a comprehensive report of specific HEDIS measure data. Start
          by selecting the measure, then click on <strong>Get Report</strong> to
          receive a data sheet export.
        </Typography>
        <Grid item className='report-builder__selector-panel'>
          <MeasureSelector
            currentResults={store.currentResults}
            measure={measure}
            handleMeasureChange={handleMeasureChange}
          />
        </Grid>
        {measure !== undefined && (
          <a
            className='report-builder__download-link'
            href={`${env.REACT_APP_HEDIS_MEASURE_API_URL}measures/exportCsv?measurementType=${measure}`}
            target='_blank'
            rel='noreferrer'
          >
            Get Report
          </a>
        )}
      </div>
    </Box>
  );
}
ReportBuilder.propTypes = {
  store: storeProps,
};
ReportBuilder.defaultProps = {
  store: {
    currentResults: [],
  },
};

export default ReportBuilder;
