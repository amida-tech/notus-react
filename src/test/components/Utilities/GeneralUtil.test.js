import { getMeasureCompliance } from 'components/Utilities/GeneralUtil';
import { getDatestamp, getNumDenValue } from 'components/Utilities/GeneralUtil';
import { memberResultTrue, complianceResultTrue, memberResultFalse, complianceResultFalse } from 'test/resources/constants/GeneralUtilsConstants';

beforeAll(() => {
    // Control passing of time for testing
    jest.useFakeTimers('modern');
    // Set the fake system time to a fixed date
    jest.setSystemTime(new Date('2025-02-03T10:00:00Z'));
});

afterAll(() => {
    // Restore real timers and the original Date
    jest.useRealTimers();
});

// Tests for getDatestamp
describe('getDatestamp (date)', () => {
    it('creates the correct timestamp', () => {
        const dateStamp = getDatestamp(Date.now());
        expect(dateStamp).toContain('1,738,576,800,000');
    });
});

// Tests for getNumDenValue
describe('getNumDenValue  (memberValue)', () => {
    it('functions as expected when fed an array', () => {
        const arr = ['a', 'b']
        const result = getNumDenValue(arr);
        // Assert the result is the array's length
        expect(result).toBe(arr.length)
    });

    it('functions as expected when fed booleans', () => {
        const resultTrue = getNumDenValue(true);
        const resultFalse = getNumDenValue(false)
        // Assert the correct results for true & false
        expect(resultTrue).toBe(1)
        expect(resultFalse).toBe(0)
    });
});

// Tests for getMeasureCompliance
describe('getMeasureCompliance (memberResult)', () => {
    it('generates true compliance results', () => {
        const compliant = getMeasureCompliance(memberResultTrue);
        expect(compliant).toStrictEqual(complianceResultTrue)
    })
    it('generates a false compliance result', () => {
        const nonCompliant = getMeasureCompliance(memberResultFalse);
        expect(nonCompliant).toStrictEqual(complianceResultFalse)
    })
})
