import { Button, Grid, Paper, Tab, Tabs } from '@mui/material';
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
export const byLineMeasureContext = createContext('')
export const byLineDisplayDataContext = createContext('');

function ChartContainer() {
  const { datastore, setDatastore } = useContext(datastoreContext);
  const [displayData, setDisplayData] = useState(datastore);
  const [byLineDisplayData, setByLineDisplayData] = useState('');
  const [currentFilters, setCurrentFilters] = useState([]);
  const [byLineMeasure, setByLineMeasure] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    setDisplayData(datastore);
  }, [datastore]);

  useEffect(() => {
    setByLineDisplayData('');
  }, [datastore]);

  const handleChange = (event, newValue) => {

    const newDisplayData = [...datastore];

    if (newValue === 0) {
      setDatastore(newDisplayData);
      // setDisplayData(newDisplayData);
      setByLineDisplayData('')
    }
    else if (newValue === 1) {
      console.log(1)
      setByLineDisplayData('')
    }
    else {
      console.log("else")
      setByLineDisplayData(newDisplayData[0])
    }
    setTabValue(newValue);
  };

  return (
    <div>
      <byLineDisplayDataContext.Provider value={{ byLineDisplayData, setByLineDisplayData }}>
        <displayDataContext.Provider value={{ displayData, setDisplayData }}>
          <currentFilterContext.Provider value={{ currentFilters, setCurrentFilters }}>
            <byLineMeasureContext.Provider value={{ byLineMeasure, setByLineMeasure }}>
              <Tabs value={tabValue}
                onChange={(event, index) => handleChange(event, index)}
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
          </currentFilterContext.Provider>
        </displayDataContext.Provider>
      </byLineDisplayDataContext.Provider>
    </div>
  )
}

export default ChartContainer;
