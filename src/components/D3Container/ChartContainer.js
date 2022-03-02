import { Divider, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { datastoreContext } from '../../layouts/dashboard';
import ChartBar from './ChartBar';
import { generateFilterPaneValues, generateMeasureList, refineDisplayData } from './ChartContainerUtils';
import D3Chart from '../D3Chart/D3Chart';
import D3Filter from './D3Filter';
import D3IndicatorByLineChart from '../D3IndicatorByLine/D3IndicatorByLineChart';
import IndicatorByLineSelector from 'components/D3IndicatorByLine/IndicatorByLineSelector';
import D3FilterSelection from './D3FilterSelection';

export const currentFilterContext = createContext([])
export const displayDataContext = createContext([])
export const firstRenderContext = createContext(true)
export const byLineMeasureContext = createContext('')
export const byLineDisplayDataContext = createContext('');

function ChartContainer() {
  const { datastore, setDatastore } = useContext(datastoreContext)
  const [displayData, setDisplayData] = useState(datastore);
  const [byLineDisplayData, setByLineDisplayData] = useState('');
  const [currentFilters, setCurrentFilters] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [byLineMeasure, setByLineMeasure] = useState('')


  const measureList = generateMeasureList(datastore);

  useEffect(() => {
    setDisplayData(datastore);
  }, [datastore]);

  useEffect(() => {
    setByLineDisplayData('');
  }, [datastore]);

  return (
    <div>
      <byLineDisplayDataContext.Provider value={{ byLineDisplayData, setByLineDisplayData }}>
        <displayDataContext.Provider value={{ displayData, setDisplayData }}>
          <currentFilterContext.Provider value={{ currentFilters, setCurrentFilters }}>
            <firstRenderContext.Provider value={{ firstRender, setFirstRender }}>
              <byLineMeasureContext.Provider value={{ byLineMeasure, setByLineMeasure }}>
                <Paper>
                  <Grid container>
                    <Grid item sx={{ width: '25%' }}>
                      <IndicatorByLineSelector />
                    </Grid>
                  </Grid>
                  <D3IndicatorByLineChart />
                </Paper>
                <Grid container justifyContent="space-evenly" direction="column">
                  <Grid sx={{ mb: '-30px' }} item>
                    <ChartBar />
                  </Grid>
                  <Grid item>
                    <D3Chart />
                  </Grid>
                </Grid>
                <D3FilterSelection />
              </byLineMeasureContext.Provider>
            </firstRenderContext.Provider>
          </currentFilterContext.Provider>
        </displayDataContext.Provider>
      </byLineDisplayDataContext.Provider>
    </div>
  )
}

export default ChartContainer;
