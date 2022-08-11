import axios from "axios";
import env from './env';

export default async function memberInfo() {
  // get all the rest of this from App.js

  return await axios.get(`${env.REACT_APP_TOKENINFO}?access_token=${accessToken}`);
}
