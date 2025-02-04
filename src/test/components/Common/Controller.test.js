import { jest } from '@jest/globals';
import { memberInfoFetch } from 'components/Common/Controller';
import axios from 'axios';
import {
  mockUrl,
  mockId,
  mockErr,
  mockUserData,
  mockResolvedUserData,
  mockMeasureData,
  mockResolvedMeasureData,
  mockAccessToken,
  mockResolvedValidateAccessToken,
  mockSearchMeasure,
  mockSearchArray,
  mockIsCompositeFalse,
  mockSuccess,
  mockFailed,
  mockResolvedFilterSearch,
  mockResolvedInfoData,
  mockInfoDataResult,
} from '../../resources/constants/ControllerConstants';
import { measureDataFetch } from 'components/Common/Controller';
import { validateAccessToken } from 'components/Common/Controller';
import { filterSearch } from 'components/Common/Controller';
import { infoDataFetch } from 'components/Common/Controller';

// Mock axios
jest.mock('axios');

// Restore all mocks
afterAll(() => {
  jest.restoreAllMocks();
});

// Testing for memberInfoFetch
describe('memberInfoFetch(url, id)', () => {
  it('functions as expected', async () => {
    // Set resolved value for next axios call
    axios.get.mockResolvedValueOnce(mockResolvedUserData);
    // Await the memberInfoFetch
    const memberInfo = await memberInfoFetch(mockUrl, mockId);
    // Assert the correct member info
    expect(memberInfo).toBe(mockUserData);
  });

  it('handles errros gracefully', async () => {
    // Set rejected value for axios
    axios.get.mockRejectedValueOnce(new Error(mockErr));
    // Await the memberInfoFetch
    const error = await memberInfoFetch(mockUrl, mockId);
    // Assert the correct error message
    expect(error.message).toBe(mockErr);
  });
});

// Testing for measureDataFetch
describe('measureDataFetch(measure)', () => {
  it('functions as expected', async () => {
    // Set resolved value for next axios call
    axios.get.mockResolvedValueOnce(mockResolvedMeasureData);
    // Await the measureDataFetch
    const result = await measureDataFetch(mockMeasureData);
    // Assert the correct measure data
    expect(result).toBe(mockMeasureData);
  });

  it('handles errros gracefully', async () => {
    // Set rejected value for axios
    axios.get.mockRejectedValueOnce(new Error(mockErr));
    // Await the measureDataFetch
    const error = await measureDataFetch(mockMeasureData);
    // Assert the correct error message
    expect(error.message).toBe(mockErr);
  });
});

// Testing for validateAccessToken
describe('validateAccessToken(accessToken)', () => {
  it('functions as expected', async () => {
    // Set resolved value for next axios call
    axios.get.mockResolvedValueOnce(mockResolvedValidateAccessToken);
    // Await the validateAccessToken
    const result = await validateAccessToken(mockAccessToken);
    // Assert the correct result
    expect(result).toBe(true);
  });

  it('handles errros gracefully', async () => {
    // Set rejected value for axios
    axios.get.mockRejectedValueOnce(new Error(mockErr));
    // Await the validateAccessToken
    const errorResult = await validateAccessToken(mockAccessToken);
    // Assert the correct error message
    expect(errorResult).toBe(false);
  });
});

// Testing for filterSearch
describe('filterSearch(searchMeasure, searchArray, isComposite)', () => {
  it('functions as expected', async () => {
    // Set resolved value for next axios call
    axios.post.mockResolvedValueOnce(mockResolvedFilterSearch);
    // Await the filterSearch
    const result = await filterSearch(
      mockSearchMeasure,
      mockSearchArray,
      mockIsCompositeFalse,
    );
    // Assert the correct status in the result
    expect(result.status).toBe(mockSuccess);
  });

  it('handles errros gracefully', async () => {
    // Set rejected value for axios
    axios.get.mockRejectedValueOnce(new Error(mockErr));
    // Await the filterSearch
    const errorResult = await filterSearch(mockResolvedFilterSearch);
    // Assert the correct error message
    expect(errorResult['status']).toBe(mockFailed);
  });
});

// Testing for infoDataFetch
describe('infoDataFetch()', () => {
  it('functions as expected', async () => {
    // Set resolved value for next axios call
    axios.get.mockResolvedValueOnce(mockResolvedInfoData);
    // Await the infoDataFetch
    const result = await infoDataFetch();
    // Assert the correct result
    expect(result).toBe(mockInfoDataResult);
  });

  it('handles errros gracefully', async () => {
    // Set rejected value for axios
    axios.get.mockRejectedValueOnce(new Error(mockErr));
    // Await the infoDataFetch
    const errorResult = await infoDataFetch();
    // Assert the correct error message
    expect(errorResult.message).toBe(mockErr);
  });
});
