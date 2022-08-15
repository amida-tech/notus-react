import axios from 'axios'
import env from '../../env'

// MemberReport.js
export default async function memberInfoFetch(url, id) {
  // write a check here for undefined id for testing purposes or for invalid id?
  try {
    const result = await axios.get(`${url}?memberId=${id}`).then((res) => res.data)
    return result
  } catch (error) {
    return error
  }
}

// D3Container.js

// DatastoreProvider.js

// App.js
