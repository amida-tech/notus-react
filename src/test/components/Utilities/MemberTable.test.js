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
    filterByNonComplianceImaeMany,
    tableFilterNone,
    filterByNonComplianceImaeNone,
} from 'test/resources/constants/MemberTableConstants';

// headerData
describe('headerData (selectedMeasures, storeInfo)', () => {
    it('functions as expected with selectedMeasure < 4', () => {
        const result = headerData(selectedMeasuresAab, infoObject);
        expect(result).toEqual(headerInfoAab);
    });
    it('functions as expected with selectedMeasure >= 4', () => {
        const result = headerData(selectedMeasuresImae, infoObject);
        expect(result).toEqual(headerInfoImae);
    });
});

// formatData
describe('formatData (memberResults, activeMeasure, storeInfo, tableFilter)', () => {
    it('does the thing', () => {
        const result = formatData(
            memberResultsImae,
            activeMeasureImae,
            infoObject,
            tableFilterMany
        );
        expect(result).toEqual(filterByNonComplianceImaeMany);
    });

    // it('does the thing', () => {
    //     const result = formatData(
    //         memberResultsImae,
    //         activeMeasureImae,
    //         infoObject,
    //         tableFilterNone
    //     );
    //     expect(result).toEqual(filterByNonComplianceImaeNone);
    // });
});
