import {
    signInAndGetToken,
    azRedirect,
    azLogout
} from 'views/auth/AuthService';
import {
    mockDefaultTestAuthenticationResult,
    mockAzureSignInResponse
} from 'test/resources/constants/AuthServiceConstants';

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

afterAll(() => {
    jest.restoreAllMocks();
});

describe('signInAndGetToken', () => {
    it('returns the correct response', async () => {
        const result = await signInAndGetToken();
        expect(result).toStrictEqual(mockAzureSignInResponse);
    });

    // failure testing for if object does not contain keys might have to bring into another file for failure testing
});

describe('azRedireect', () => {
    // figure out how to test these pieces
    it('redirects appropriately', () => {
        azRedirect();
    });
});

describe('azLogout', () => {
    // figure out how to test these pieces
    it('redirects appropriately', () => {
        azLogout();
    });
});
