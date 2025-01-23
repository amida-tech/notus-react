# saraswati-dashboard
The purpose of this API is to ingest HEDIS data from pyspark, save it, and then use it to populate the [Sarawati Dashboard](https://github.com/amida-tech/saraswati-dashboard).

## Set up
1. Run `cp .env.example .env`
2. Stand up the dashboard 
  - If you are on a linux based terminal 
    - Simply run `yarn run install:clean`
  - If not 
    - Run in terminal `yarn`
    - Run in terminal `yarn start`
3. Navigate to https://localhost:3000.


## Env Variables
`REACT_APP_HEDIS_MEASURE_API_URL` - URL To access HeRA
`REACT_APP_GOOGLE_OAUTH_URL` - URL For Google OAuth
`REACT_APP_GOOGLE_CLIENT_ID` - Client ID setup for Saraswati authentication
`REACT_APP_DASHBOARD_URL` - URL for Saraswati Dashboard
`REACT_APP_TOKENINFO` - URL for Google access token
`REACT_APP_DEV_DATA` - `true` to use data from local file, `false` to fetch data from mongodb
`REACT_APP_AUTH` - `true` to force authorization before accessing dashboard, `false` to bypass authorization
`REACT_APP_LEGACY_RESULTS` - `true` to get results from pre-calculated collection, `false` to calculate results each query
`DEBUG_PRINT_LIMIT` - print limit in debug statements
`REACT_APP_AD_APP_ID` - Azure application ID on app registration connected to tenant
`REACT_APP_AD_REDIRECT_URI` - Page where the app redirects after azure login
`REACT_APP_AD_AUTHORITY` - Azure authority URL `https://login.microsoftonline.com/<AZURE_AD_B2C_TENANT>`

## Dynamically Change ENV during runtime
On Debian-
`[env variables] npx react-inject-env set`
On Windows (CMD) -
`set [env variable]; set [env variables]&& npx react-inject-env set`

Examples -
`REACT_APP_MVP_SETTING=true npx react-inject-env set`
`set REACT_APP_MVP_SETTING=true&& npx react-inject-env set`

Static ENV's DO NOT ovveride your commands, but you must inject them into your static build folder with

`npx react-inject-env  -d [build directory]`
or usually
`npx react-inject-env -d ./build`
