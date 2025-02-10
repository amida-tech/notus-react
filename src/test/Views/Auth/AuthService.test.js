import {
    signInAndGetToken,
    azRedirect,
    azLogout,
    msalInstance
} from 'views/auth/AuthService';
import {
    mockDefaultTestAuthenticationResult,
    mockAzureSignInResponse
} from 'test/resources/constants/AuthServiceConstants';

// Mock the PCA Constructor and it's methods
jest.mock('@azure/msal-browser', () => {
    return {
        PublicClientApplication: jest.fn().mockImplementation(() => {
            return {
                loginPopup: async () =>
                    Promise.resolve(mockDefaultTestAuthenticationResult),
                acquireTokenSilent: async () =>
                    Promise.resolve(mockDefaultTestAuthenticationResult),
                loginRedirect: jest.fn(),
                acquireTokenPopup: jest.fn(),
                acquireTokenRedirect: jest.fn(),
                logout: jest.fn(),
                logoutRedirect: jest.fn(),
                logoutPopup: jest.fn(),
                getAllAccounts: jest.fn(),
                getAccountByUsername: jest.fn(),
                handleRedirectPromise: jest.fn()
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
})

describe('AuthService.js', () => {
    it('returns the correct response from signInAndGetToken', async () => {
        // Call signInAndGetToken
        const result = await signInAndGetToken();
        // Assert the correct response
        expect(result).toStrictEqual(mockAzureSignInResponse);
    });

    // figure out how to test these pieces
    it('azRedirect calls loginRedirect', () => {
        // Call azRedirect
        azRedirect();
        // Assert loginRedirect was called
        expect(msalInstance.loginRedirect).toHaveBeenCalled();
    });

    // figure out how to test these pieces
    it('azLogout calls logoutRedirect & logoutPopup', () => {
        // Call azLogout
        azLogout();
        // Assert logoutRedirect & logoutPopup were called
        expect(msalInstance.logoutRedirect).toHaveBeenCalled();
        expect(msalInstance.logoutPopup).toHaveBeenCalled()
    });
});
