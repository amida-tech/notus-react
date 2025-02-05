import '@testing-library/jest-dom';
import { sortedTrendsCreator } from 'components/Summary/RatingTrendsUtils';
import {
    trendsImae,
    activeMeasureImae,
    measureTrendImae,
    sortedTrendsResultImae,
    activeMeasureComposite,
    measureTrendComposite,
    sortedTrendsResultComposite,
    trendsComposite,
    infoMain,
    activeMeasureMain,
    measureTrendMain, resultMain
} from 'test/resources/constants/RatingTrendsUtilsConstants';
import { mainTrendCreator } from 'components/Summary/RatingTrendsUtils';

// sortedTrendsCreator(activeMeasure, trends, measureTrend)
describe('sortedTrendsCreator(activeMeasure, trends, measureTrend)', () => {
    // Test for non-composite measure
    it('creates sorted trends object without a composite measure', () => {
        const result = sortedTrendsCreator(
            activeMeasureImae,
            trendsImae,
            measureTrendImae
        );
        expect(result).toEqual(sortedTrendsResultImae);
    });
    // Test for composite measure
    it('creates sorted trends object with a composite measure', () => {
        const result = sortedTrendsCreator(
            activeMeasureComposite,
            trendsComposite,
            measureTrendComposite
        );
        expect(result).toEqual(sortedTrendsResultComposite);
    });
});

// mainTrendCreator(activeMeasure, info, measureTrend)
describe('mainTrendCreator(activeMeasure, info, measureTrend)', () => {
    // Test for main trend
    it('creates a main trend object', () => {
        const result = mainTrendCreator(
            activeMeasureMain,
            infoMain,
            measureTrendMain
        );
        expect(result).toEqual(resultMain);
    });
});
