Object.defineProperty(global.self, 'crypto', {
    value: {
        // Needed for @azure/msal-browser
        subtle: {
            digest: jest.fn(),
        },
    },
});