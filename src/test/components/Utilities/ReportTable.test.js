import { formatData } from 'components/Utilities/ReportTable';
import {
    storeInfo,
    selectedMeasure,
    memberData
} from 'test/resources/constants/ReportTableConstants';

describe('formatData (memberData, selectedMeasure, storeInfo) from ReportTable.js', () => {
    it('functions properly', () => {
        // Assert formatData returns the correct result when called
        const result = formatData(memberData, selectedMeasure, storeInfo);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(5);
    });
});
