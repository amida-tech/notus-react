// common
export const mockErr = '***Intentional Mock Error***';

// memberInfoFetch
export const mockUrl = 'https://mock-url.com/';
export const mockId = 'mock-id';
export const mockUserData = 'Mock User Data';
export const mockResolvedUserData = {
  status: 200,
  data: mockUserData,
};

// measureDataFetch
export const mockMeasureData = 'Mock Measure Data';
export const mockResolvedMeasureData = {
  status: 200,
  data: mockMeasureData,
};

// validateAccessToken
export const mockAccessToken = 'Mock Access Token';
export const mockResolvedValidateAccessToken = {
  status: 200,
  data: mockAccessToken,
};

// filterSearch
export const mockSearchMeasure = {};
export const mockSearchArray = [];
export const mockIsCompositeFalse = false;
export const mockSuccess = 'Success';
export const mockFailed = 'Failed';
export const mockMembersArray = ['Mock Member 1', 'Mock Member 2'];
export const mockDailyMeasureResultsArray = [
  'Daily Measure Result 1',
  'Daily Measure Result 2',
];
export const mockResolvedFilterSearch = {
  status: 200,
  data: {
    status: mockSuccess,
    members: mockMembersArray,
    dailyMeasureResults: mockDailyMeasureResultsArray,
  },
};

// infoDataFetch
export const mockInfoDataResult = {
  composite: {
    title: 'Composite Score',
    displayLabel: 'Composite',
    hasSubMeasures: false,
  },
  aab: {
    domainOfCare: 'EOC',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    displayLabel: 'AAB',
    description:
      'AAB assesses the percentage of episodes for members 3 months of age and older with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false,
    inverted: true,
    link: 'https://www.ncqa.org/hedis/measures/avoidance-of-antibiotic-treatment-for-acute-bronchitis-bronchiolitis/',
  },
  // ...
  // ...
};
export const mockResolvedInfoData = { status: 200, data: mockInfoDataResult };
