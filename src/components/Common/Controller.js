import axios from 'axios'
import env from '../../env'

// MemberReport.js
export async function memberInfoFetch(url, id) {
  // write a check here for undefined id for testing purposes or for invalid id?
  try {
    const memberInfo = await axios.get(`${url}?memberId=${id}`).then((res) => res.data)
    return memberInfo
  } catch (error) {
    return error
  }
}
// App.js
export async function validateAccessToken(accessToken) {
  try {
    const auth = await axios.get(`${env.REACT_APP_TOKENINFO}?access_token=${accessToken}`);
    if (auth.status === 200) {
      return true;
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
  return false;
}
// D3Container.js
export async function measureDataFetch(measure) {
  const memberUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members?measurementType=${measure}`)
  const defaultVal = await axios.get(memberUrl).then((values) => values.data)
  return defaultVal
}
