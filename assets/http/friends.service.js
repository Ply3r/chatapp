import axios from "axios";
import HttpService from "./http.service";
import useToken from "../../stores/useToken";

class FriendService extends HttpService {
  constructor() {
    super();
    this.token = useToken().getToken
  }

  async search(search) {
    const response = await axios.get(this.ApiBaseUrl + `/friends?search=${search}`, {headers: { authorization: this.token} });
  
    return response;
  }

  async getSentRequests() {
    const response = await axios.get(this.ApiBaseUrl + '/friends/sent', {headers: { authorization: this.token} });

    return response;
  }

  async getReceivedRequests() {
    const response = await axios.get(this.ApiBaseUrl + '/friends/received', {headers: { authorization: this.token} });

    return response;
  }

  async acceptRequest(id) {
    const response = await axios.patch(this.ApiBaseUrl + `/friends/accept`, {id}, {headers: { authorization: this.token} });
    
    return response
  }

  async createRequest(data) {
    const response = await axios.post(this.ApiBaseUrl + `/friends`, data, {headers: { authorization: this.token} });
    
    return response
  }

  async removeRequest(id) {
    const response = await axios.delete(this.ApiBaseUrl + `/friends/${id}`, {headers: { authorization: this.token} });
    
    return response
  }
}

export default FriendService;
