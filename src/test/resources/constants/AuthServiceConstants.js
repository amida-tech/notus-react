export const mockAccessToken =
    'mocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmocktokenmockt';

export const mockDefaultTestAccountInfo = {
    homeAccountId: 'home-account-id',
    localAccountId: 'local-account-id',
    environment: 'login.windows.net',
    tenantId: 'tenant-id',
    username: 'john.doe@contoso.com',
    name: 'John Doe'
};

export const mockDefaultTestAuthenticationResult = {
    authority: 'https://login.microsoftonline.com',
    uniqueId: 'unique-id',
    tenantId: 'tenant-id',
    scopes: ['openid', 'profile'],
    idToken: 'test-id-token',
    idTokenClaims: {},
    accessToken: mockAccessToken,
    fromCache: false,
    correlationId: 'test-correlation-id',
    expiresOn: new Date(Date.now() + 3600000),
    account: mockDefaultTestAccountInfo,
    tokenType: 'Bearer'
};

export const mockAzureSignInResponse = {
    token: mockAccessToken,
    user: { name: mockDefaultTestAccountInfo.name, email: mockDefaultTestAccountInfo.username }
  }