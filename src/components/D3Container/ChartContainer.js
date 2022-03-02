import { Grid, Paper, Tab, Tabs } from '@mui/material';
import IndicatorByLineSelector from 'components/D3IndicatorByLine/IndicatorByLineSelector';
import TabPanel from 'components/TabPanel/TabPanel';
import React, {
  createContext, useContext, useEffect, useState
} from 'react';
import { datastoreContext } from '../../layouts/dashboard';
import D3Chart from '../D3Chart/D3Chart';
import D3IndicatorByLineChart from '../D3IndicatorByLine/D3IndicatorByLineChart';
import ChartBar from './ChartBar';
import D3FilterSelection from './D3FilterSelection';

export const currentFilterContext = createContext([])
export const displayDataContext = createContext([])
export const firstRenderContext = createContext(true)
export const byLineMeasureContext = createContext('')
export const byLineDisplayDataContext = createContext('');

function ChartContainer() {
  const { datastore, setDatastore } = useContext(datastoreContext);
  const [displayData, setDisplayData] = useState(datastore);
  const [byLineDisplayData, setByLineDisplayData] = useState('');
  const [currentFilters, setCurrentFilters] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [byLineMeasure, setByLineMeasure] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    setDisplayData(datastore);
  }, [datastore]);

  useEffect(() => {
    setByLineDisplayData('');
  }, [datastore]);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    console.log(event.target)
    switch (newValue) {
      case 0:
        setDisplayData(datastore);
        setByLineDisplayData('')
        break;
      case 1:
        setByLineDisplayData('')
        break;
    }
    setTabValue(newValue);
  };

  return (
    <div>
      <byLineDisplayDataContext.Provider value={{ byLineDisplayData, setByLineDisplayData }}>
        <displayDataContext.Provider value={{ displayData, setDisplayData }}>
          <currentFilterContext.Provider value={{ currentFilters, setCurrentFilters }}>
            <firstRenderContext.Provider value={{ firstRender, setFirstRender }}>
              <byLineMeasureContext.Provider value={{ byLineMeasure, setByLineMeasure }}>
                <Tabs value={tabValue}
                  onChange={handleChange}
                  indicatorColor={"primary"}>
                  <Tab label="All Measures" />
                  <Tab label="Measure by Line" />
                </Tabs>
                <TabPanel value={tabValue} index={1}>
                  <Paper>
                    <Grid container>
                      <Grid item sx={{ width: '25%' }}>
                        <IndicatorByLineSelector />
                      </Grid>
                    </Grid>
                    <D3IndicatorByLineChart />
                  </Paper>
                </TabPanel>
                <TabPanel value={tabValue} index={0}>
                  <Grid container justifyContent="space-evenly" direction="column">
                    <Grid sx={{ mb: '-30px' }} item>
                      <ChartBar />
                    </Grid>
                    <Grid item>
                      <D3Chart />
                    </Grid>
                  </Grid>
                  <D3FilterSelection />
                </TabPanel>
              </byLineMeasureContext.Provider>
            </firstRenderContext.Provider>
          </currentFilterContext.Provider>
        </displayDataContext.Provider>
      </byLineDisplayDataContext.Provider>
    </div>
  )
}

export default ChartContainer;
