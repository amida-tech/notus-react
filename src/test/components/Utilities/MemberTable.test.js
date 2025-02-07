import { formatData, headerData } from 'components/Utilities/MemberTable';
import { infoObject } from 'test/data/DemoData';

import {
    selectedMeasuresAab,
    headerInfoAab,
    selectedMeasuresImae,
    headerInfoImae,
    memberResultsImae,
    activeMeasureImae,
    tableFilterMany,
    filterByNonComplianceImaeMany
} from 'test/resources/constants/MemberTableConstants';

// headerData
describe('headerData (selectedMeasures, storeInfo)', () => {
    it('functions as expected with selectedMeasure < 4', () => {
        // Assert headerData returns the correcet result
        const result = headerData(selectedMeasuresAab, infoObject);
        expect(result).toEqual(headerInfoAab);
    });
    it('functions as expected with selectedMeasure >= 4', () => {
        // Assert headerData returns the correcet result
        const result = headerData(selectedMeasuresImae, infoObject);
        expect(result).toEqual(headerInfoImae);
    });
});

// formatData
describe('formatData (memberResults, activeMeasure, storeInfo, tableFilter)', () => {
    it('does the thing', () => {
        // Assert formatData returns the correcet result
        const result = formatData(
            memberResultsImae,
            activeMeasureImae,
            infoObject,
            tableFilterMany
        );
        expect(result).toEqual(filterByNonComplianceImaeMany);
    });
});
