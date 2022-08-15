import axios from 'axios'
import env from '../../env'

// MemberReport.js
export async function memberInfoFetch(url, id) {
  // write a check here for undefined id for testing purposes or for invalid id?
  try {
    const result = await axios.get(`${url}?memberId=${id}`).then((res) => res.data)
    return result
  } catch (error) {
    return error
  }
}

// App.js
export async function validateAccessToken(accessToken) {
  try {
    const res = await axios.get(`${env.REACT_APP_TOKENINFO}?access_token=${accessToken}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
  return false;
}

// D3Container.js
