import '@testing-library/jest-dom';
import { mainTrendCreator } from 'components/Summary/RatingTrendsUtils';
import { sortedTrendsCreator } from 'components/Summary/RatingTrendsUtils';
import activeMeasureComposite from './resources/json/activeMeasureComposite.json';
import activeMeasureImae from './resources/json/activeMeasureImae.json';
import activeMeasureMain from './resources/json/activeMeasureMain.json';
import infoMain from './resources/json/infoMain.json';
import measureTrendComposite from './resources/json/measureTrendComposite.json';
import measureTrendImae from './resources/json/measureTrendImae.json';
import measureTrendMain from './resources/json/measureTrendMain.json';
import resultMain from './resources/json/resultMain.json';
import sortedTrendsResultComposite from './resources/json/sortedTrendsResultComposite.json';
import sortedTrendsResultImae from './resources/json/sortedTrendsResultImae.json';
import trendsComposite from './resources/json/trendsComposite.json';
import trendsImae from './resources/json/trendsImae.json';

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
