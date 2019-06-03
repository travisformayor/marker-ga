import axios from 'axios';
// axios.defaults.withCredentials = true; // Gets session cookie from responses

let endpoint = '/api/v1/test'; 

// note: the following doesn't work unless you use the heroku buildpack. 
// ex: heroku create app-name --buildpack mars/create-react-app
// https://github.com/mars/create-react-app-buildpack
// if(process.env.NODE_ENV === 'production') { // we are on heroku!
//   cityEndpoint = 'https://wayfare-back-345.herokuapp.com/api/v1/cities';
// }

console.log('User Env: ', process.env.NODE_ENV);
console.log('endpoint set to: ', endpoint);

class TestModel {

  static getTest() {
    const api_url = `${endpoint}`;
    let request = axios.get(api_url);
    return request;
  }
}

export default TestModel;