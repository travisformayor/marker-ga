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
  // Manage Drafts
  // make a new blank draft
  static newDraft(token) {
    // console.log('Token in axios: ', token)
    const api_url = `${endpoint}/create/draft`;
    let request = axios.post(api_url, 'test', {headers: {
        'authorization': token}});
    return request;
  }
  // Get All Drafts for user
  static getDrafts(token) {
    const api_url = `${endpoint}/create/drafts`;
    let request = axios.get(api_url, {headers: {
      'authorization': token}});
    return request;
  }
  static deleteDraft(data, token) {
    const api_url = `${endpoint}/auth/draft`;
    let request = axios.delete(api_url, data, {headers: {
      'authorization': token}});
    return request;
  }
  // send an image to a draft record
  static sendImage(data, setUploadPercentage, token) {
    // console.log('Token in axios: ', token)
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