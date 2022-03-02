import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { byLineDisplayDataContext, byLineMeasureContext } from 'components/D3Container/ChartContainer';
import { generateMeasureList } from 'components/D3Container/ChartContainerUtils';
import { datastoreContext } from 'layouts/dashboard';
import { useContext } from 'react';

function IndicatorByLineSelector() {

    const {datastore, setDatastore} = useContext(datastoreContext);
    const {byLineMeasure, setByLineMeasure} = useContext(byLineMeasureContext);
    const { byLinedisplayData, setByLineDisplayData} = useContext(byLineDisplayDataContext);

    const measureList = generateMeasureList(datastore);

    const handleChange = (event) => {
        setByLineMeasure(event.target.value);
        const filteredDisplayData = datastore.filter((item) => item.measure === event.target.value);
        setByLineDisplayData(filteredDisplayData);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="d3-indicator-by-line-selector">Measure By Line</InputLabel>
            <Select
                labelId="d3-indicator-by-line-selector-label"
                id="indicator-by-line-selector"
                value={byLineMeasure}
                label="Measure By Line"
                onChange={handleChange}
                sx={{ color: 'black.light' }}
            >
                {measureList.map((measure) => {
                    return (
                        <MenuItem sx={{ color: 'black.light' }} value={measure}>{measure.toUpperCase()}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )

}

export default IndicatorByLineSelector;