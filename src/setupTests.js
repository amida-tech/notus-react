// Set logic to replace crypto getRandomValues (needed for @azure/msal-browser)
Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(),
    },
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
    },
  },
});

// before each test, set REACT_APP_DEV_DATA to true;
beforeEach(() => {
  process.env.REACT_APP_DEV_DATA = true;
});

// after each test, reset REACT_APP_DEV_DATA to false
afterEach(() => {
  delete process.env.NODE_ENV; // Restore original value
});

jest.setTimeout(70000)