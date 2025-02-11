// Set logic to replace crypto getRandomValues (needed for @azure/msal-browser)
Object.defineProperty(global.self, 'crypto', {
    value: {
        subtle: {
            digest: jest.fn()
        },
        getRandomValues: (arr) => {
            crypto.randomBytes(arr.length);
        }
    }
});

// before each test, set REACT_APP_DEV_DATA to true;
beforeEach(() => {
    process.env.REACT_APP_DEV_DATA = true;
});

// after each test, reset REACT_APP_DEV_DATA to false
afterEach(() => {
    delete process.env.NODE_ENV; // Restore original value
});

jest.setTimeout(70000);

// Set the global structrued clone
global.structuredClone = (val) => {
    return JSON.parse(JSON.stringify(val));
};
