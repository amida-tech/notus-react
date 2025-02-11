import { headerData } from 'components/Utilities/MeasureTable';

describe('headerData (isComposite)', () => {
    it('true', () => {
        // Assert headerData returns the correct result
        const result = headerData(true);
        expect(result).toBeInstanceOf(Array);
    });
    it('false', () => {
        // Assert headerData returns the correct result
        const result = headerData(false);
        expect(result).toBeInstanceOf(Array);
    });
});
