import {
    activeMeasureImae,
    filterByNonComplianceImaeMany,
    headerInfoAab,
    headerInfoImae,
    memberResultsImae,
    selectedMeasuresAab,
    selectedMeasuresImae,
    tableFilterMany
} from 'test/resources/constants/MemberTableConstants';
import { formatData, headerData } from 'components/Utilities/MemberTable';
import { infoObject } from 'test/data/DemoData';

// headerData
describe('headerData (selectedMeasures, storeInfo)', () => {
    it('functions as expected with selectedMeasure < 4', () => {
        // Assert headerData returns the correct result
        const result = headerData(selectedMeasuresAab, infoObject);
        expect(result).toEqual(headerInfoAab);
    });
    it('functions as expected with selectedMeasure >= 4', () => {
        // Assert headerData returns the correct result
        const result = headerData(selectedMeasuresImae, infoObject);
        expect(result).toEqual(headerInfoImae);
    });
});

// formatData
describe('formatData (memberResults, activeMeasure, storeInfo, tableFilter)', () => {
    it('does the thing', () => {
        // Assert formatData returns the correct result
        const result = formatData(
            memberResultsImae,
            activeMeasureImae,
            infoObject,
            tableFilterMany
        );
        expect(result).toEqual(filterByNonComplianceImaeMany);
    });
});
