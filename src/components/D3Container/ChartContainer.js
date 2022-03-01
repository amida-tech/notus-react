import { Divider, Grid, Typography, Paper } from '@mui/material';
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { datastoreContext } from '../../layouts/dashboard';
import ChartBar from './ChartBar';
import { generateFilterPaneValues, refineDisplayData } from './ChartContainerUtils';
import D3Chart from './D3Chart';
import D3Filter from './D3Filter';
import D3IndicatorByLineChart from './D3IndicatorByLineChart';

export const currentFilterContext = createContext([])
export const displayDataContext = createContext([])
export const firstRenderContext = createContext(true)

function ChartContainer() {
  const { datastore, setDatastore } = useContext(datastoreContext)
  const [displayData, setDisplayData] = useState(datastore);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  const workingList = [];
  datastore.forEach((item) => workingList.push(item.measure));
  const measureList = Array.from(new Set(workingList));

  useEffect(() => {
    setDisplayData(datastore);
  }, [datastore]);

  const changeFunction = (filter) => {
    const filterArray = [...currentFilters];
    // Will need to be adjusted once model data is available.
    const active = filterArray.find((item) => item.type === 'measure' && item.value === filter.value);
    if (active !== undefined) {
      const newFilterArray = filterArray.filter((item) => item.value !== filter.value);
      setCurrentFilters(newFilterArray);
      setDisplayData(refineDisplayData([...datastore], newFilterArray, measureList));
    } else {
      const newFilter = {
        value: filter.value,
        type: 'measure',
      }
      filterArray.push(newFilter);
      setCurrentFilters(filterArray);
      setDisplayData(refineDisplayData([...datastore], filterArray, measureList));
    }
  }

  return (
    <div>
      <displayDataContext.Provider value={{ displayData, setDisplayData }}>
        <currentFilterContext.Provider value={{ currentFilters, setCurrentFilters }}>
          <firstRenderContext.Provider value={{ firstRender, setFirstRender }}>
            <Paper>
              <Typography color="black.dark">Hello, yes this is dog.</Typography>
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
            <Grid container direction="column" spacing={0.25}>
              <Grid container item justifyContent="space-evenly" direction="row" alignItems="center" spacing={2} sx={{ width: '100%', p: '3px', m: '2px' }}>
                <Grid item xs={1}>
                  <Typography>
                    Measure
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Included
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Eligible Population
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Numerator
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Denominator
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Exclusions
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>
                    View
                  </Typography>
                </Grid>
              </Grid>
              {measureList.map((item, index) => {
                const craftedKey = `chart-container-grid-measure-${index}`;
                const filter = generateFilterPaneValues(datastore, item);
                return (
                  <Grid
                    item
                    sx={{ width: '100%' }}
                    key={craftedKey}
                  >
                    <D3Filter filter={filter} changeFunction={() => changeFunction(filter)} />
                  </Grid>
                )
              })}
              <Divider color="black" />
            </Grid>
          </firstRenderContext.Provider>
        </currentFilterContext.Provider>
      </displayDataContext.Provider>
    </div>
  )
}

export default ChartContainer;
