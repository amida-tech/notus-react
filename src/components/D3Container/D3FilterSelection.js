import { Button, Divider, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";
import { datastoreContext } from "layouts/dashboard";
import React, { useContext } from "react";
import { currentFilterContext, displayDataContext } from "./ChartContainer";
import { generateFilterPaneValues, generateMeasureList, refineDisplayData } from "./ChartContainerUtils";
import D3Filter from "./D3Filter";

function D3FilterSelection() {

    const { datastore, setdataStore } = useContext(datastoreContext);
    const { currentFilters, setCurrentFilters } = useContext(currentFilterContext);
    const { displayData, setDisplayData } = useContext(displayDataContext);

    const measureList = generateMeasureList(datastore);

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
    )
}

export default D3FilterSelection;