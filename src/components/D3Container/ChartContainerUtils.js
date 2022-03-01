export const refineDisplayData = (data, filters, measureList) => {
    const initialData = data;
    let workingData = [];
    const filterArray = filters;
    if (filterArray.length === 0) {
        workingData = initialData;
    } else if (filterArray.length === measureList.length) {
        workingData = [];
    } else {
        filterArray.forEach((filterItem) => {
            // Handles Filtering by measure
            if (filterItem.type === 'measure') {
                initialData.forEach((item) => {
                    if (item.measure !== filterItem.value) { workingData.push(item) }
                });
            }
            // TODO: Add logic in here for various filter types
        })
    }
    return workingData;
}

export function generateFilterPaneValues(datastore, filterItem) {
    const relevantMeasureList = datastore.filter((dataEntry) => filterItem === dataEntry.measure);
    const included = relevantMeasureList.length;
    let eligible = 0
    let numerator = 0
    let denominator = 0
    let exclusions = 0
    relevantMeasureList.forEach((dataEntry) => {
        eligible = eligible + (dataEntry.initialPopulation - dataEntry.exclusions)
        numerator = numerator + dataEntry.numerator
        denominator = denominator + dataEntry.denominator
        exclusions = exclusions + dataEntry.exclusions
    })

    return {
        value: filterItem,
        type: 'measure',
        included: included,
        eligible: eligible,
        numerator: numerator,
        denominator: denominator,
        exclusions: exclusions,
    }
};