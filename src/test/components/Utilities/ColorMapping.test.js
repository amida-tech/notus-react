import '@testing-library/jest-dom';
import ColorMapping from 'components/Utilities/ColorMapping';
import {
    colorMapping,
    chartColorArray,
    displayDataAab,
    resultAab,
    displayDataImae,
    resultImae
} from 'test/resources/constants/ColorMappingConstants';

describe('ColorMapping.js', () => {
    // Test color mapping without multiple subscores
    it('functions as expected with a single subscore', () => {
        const colorMap = ColorMapping(
            colorMapping,
            chartColorArray,
            displayDataAab
        );
        expect(colorMap).toEqual(resultAab);
    });

    // Test color mapping with multiple subscores
    it('functions as expected with multiple subscores', () => {
        const colorMap = ColorMapping(
            colorMapping,
            chartColorArray,
            displayDataImae
        );
        expect(colorMap).toEqual(resultImae);
    });
});
