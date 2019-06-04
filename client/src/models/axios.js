import axios from 'axios';
// axios.defaults.withCredentials = true; // Gets session cookie from responses

let endpoint = '/api/v1'; 

// note: the following doesn't work unless you use the heroku buildpack. 
// ex: heroku create app-name --buildpack mars/create-react-app
// https://github.com/mars/create-react-app-buildpack
// if(process.env.NODE_ENV === 'production') { // we are on heroku!
//   cityEndpoint = 'https://wayfare-back-345.herokuapp.com/api/v1/cities';
// }

// console.log('User Env: ', process.env.NODE_ENV);
// console.log('endpoint set to: ', endpoint);

class AxiosModel {

  static getTest() {
    const api_url = `${endpoint}/test`;
    let request = axios.get(api_url);
    return request;
  }
  // Auth
  static signup(data) {
    const api_url = `${endpoint}/auth/signup`;
    let request = axios.post(api_url, data);
    return request;
  }
  static login(data) {
    const api_url = `${endpoint}/auth/login`;
    let request = axios.post(api_url, data);
    return request;
  }
  static getProfile(token) {
    const api_url = `${endpoint}/auth/profile`;
    let request = axios.get(api_url, {headers: {authorization: token}});
    return request;
  }
}

export default AxiosModel;