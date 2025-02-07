import { headerData } from 'components/Utilities/MeasureTable';

describe('headerData (isComposite)', () => {
    it('true', () => {
        const result = headerData(true);
        expect(result).toBeInstanceOf(Array);
    });
    it('false', () => {
        const result = headerData(false);
        expect(result).toBeInstanceOf(Array);
    });
});
