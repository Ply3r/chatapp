import axios from "axios";
import HttpService from "./http.service";
import useToken from "../../stores/useToken";

class FriendService extends HttpService {
  constructor() {
    super();
    this.token = useToken().getToken
  }

  async search(params) {
    const response = await axios.get('http://localhost:3001' + `/friends?q=${params.search}`, {headers: { authorization: this.token} });
  
    return response;
  }

  async getSentRequests() {
    const response = await axios.get('http://localhost:3001' + '/friends/sent', {headers: { authorization: this.token} });

    return response;
  }

  async createRequest(data) {
    const response = await axios.post('http://localhost:3001' + `/friends`, data, {headers: { authorization: this.token} });
    
    return response
  }

  async removeRequest(id) {
    const response = await axios.delete('http://localhost:3001' + `/friends/${id}`, {headers: { authorization: this.token} });
    
    return response
  }
}

export default FriendService;
