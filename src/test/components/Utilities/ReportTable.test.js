import { formatData } from 'components/Utilities/ReportTable';
import memberData from './resources/json/memberData'
import storeInfo from './resources/json/storeInfo'

const selectedMeasure = 'aise';

describe('formatData (memberData, selectedMeasure, storeInfo) from ReportTable.js', () => {
    it('functions properly', () => {
        // Assert formatData returns the correct result when called
        const result = formatData(memberData, selectedMeasure, storeInfo);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(5);
    });
});
