import axios from 'axios';
// axios.defaults.withCredentials = true; // Gets session cookie from responses

const endpoint = '/api/v1'; 

class AxiosModel {
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
    let request = axios.get(api_url, {headers: {
      'authorization': token}});
    return request;
  }
  // Create
  static sendImage(data, setUploadPercentage, token) {
    const api_url = `${endpoint}/create/uploadimage`;
    let request = axios.post(api_url, data, {
      headers: {
        'authorization': token,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        // will get .loaded and .total
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );            
      }
    });
    return request;
  }
}

export default AxiosModel;