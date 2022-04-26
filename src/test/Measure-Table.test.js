import React from 'react';
import { render, screen } from '@testing-library/react';
import { Try } from '@mui/icons-material';
import MeasureResultsTable from '../components/MeasureResults/MeasureResultsTable';



describe('MeasureResultsTable Rendering', () => {
  test('Chart Bar renders to screen', () => {
    render(<MeasureResultsTable
      currentResults={byLineCurrentResults}
      handleMeasureChange={handleByLineMeasureChange}
      selectedMeasures={byLineSelectedMeasures}
      colorMapping={byLineColorMap}
    />)
  })
})
