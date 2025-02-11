import '@testing-library/jest-dom';
import ColorMapping from 'components/Utilities/ColorMapping';
import colorMapping from './resources/json/colorMapping';
import chartColorArray from './resources/json/chartColorArray';
import displayDataAab from './resources/json/displayDataAab';
import resultAab from './resources/json/resultAab';
import displayDataImae from './resources/json/displayDataImae';
import resultImae from './resources/json/resultImae';

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
