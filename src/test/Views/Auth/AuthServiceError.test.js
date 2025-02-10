import {
    signInAndGetToken,
} from 'views/auth/AuthService';

// Mock the PCA Constructor and it's methods
jest.mock('@azure/msal-browser', () => {
    return {
        PublicClientApplication: jest.fn().mockImplementation(() => {
            return {
                loginPopup: jest.fn(),
                acquireTokenSilent: jest.fn(),
            };
        })
    };
});

beforeAll(() => {
    // Control passing of time for testing
    jest.useFakeTimers('modern');
    // Set the fake system time to a fixed date
    jest.setSystemTime(new Date('2025-02-03T10:00:00Z'));
});

afterAll(() => {
    // Restore real timers and the original Date
    jest.useRealTimers();
    // Restore all mocks
    jest.restoreAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('AuthService.js', () => {
    it('gracefully fails when no response', async () => {
        const errorSpy = jest.spyOn(console, 'error');
        // Call signInAndGetToken
        await signInAndGetToken();
        // Assert the correct response
        expect(errorSpy).toHaveBeenCalled();
    });
});
