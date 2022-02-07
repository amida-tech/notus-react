import React, { createContext, useContext, useState } from 'react';
import D3Chart from "./D3Chart";
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { datastoreContext } from '../../layouts/dashboard.js';

import { dataList } from './DemoData';
import D3Filter from './D3Filter';

export const currentFilterContext = createContext([])
export const displayDataContext = createContext([])

function D3Container() {

    const { datastore, setDatastore } = useContext(datastoreContext)
    const [displayData, setDisplayData] = useState(datastore);
    const [currentFilters, setCurrentFilters] = useState([]);

    const workingList = [];
    dataList.forEach((item) => workingList.push(item.measure));
    const measureList = [...new Set(workingList)];

    const changeFunction = (filter) => {
        const filterArray = [...currentFilters];
        //Will need to be adjusted once model data is available.
        const active = filterArray.find((item) => item === filter);
        if (active !== undefined) {
            const newFilterArray = filterArray.filter((item) => item !== filter);
            setCurrentFilters(newFilterArray);
            setDisplayData(refineDisplayData([...datastore], newFilterArray));
        }
        else {
            filterArray.push(filter);
            setCurrentFilters(filterArray);
            setDisplayData(refineDisplayData([...datastore], filterArray));
        }
    }

    const refineDisplayData = (data, filters) => {
        const initialData = data;
        let workingData = [];
        const filterArray = filters;
        if (filterArray.length === 0) {
            workingData = initialData;
        }
        else {
            filterArray.forEach((filterItem) => {
                initialData.forEach((item) => {
                    if (item.measure !== filterItem) { workingData.push(item) }
                });
            })
        }
        return workingData;
    }

    return (
        <div>
            <displayDataContext.Provider value={{ displayData, setDisplayData }}>
                <currentFilterContext.Provider value={{ currentFilters, setCurrentFilters }}>
                    <D3Chart />
                    <Grid container direction="vertical" spacing={1}>
                        {measureList.map((filter) => {
                            return (
                                <Grid item sx={{ width: '100%' }}>
                                    <D3Filter filter={filter} changeFunction={() => changeFunction(filter)} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </currentFilterContext.Provider>
            </displayDataContext.Provider>
        </div>
    )

}

export default D3Container;