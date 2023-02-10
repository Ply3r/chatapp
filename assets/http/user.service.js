import axios from "axios";
import HttpService from "./http.service";
import useToken from "../../stores/useToken";

class UserService extends HttpService {
  constructor() {
    super();
    this.token = useToken().getToken
  }

  async getUser(token) {
    const response = await axios.get(this.ApiBaseUrl + '/users/self', {headers: { Authorization: token}});

    return response;
  }

  async create(params) {
    const response = await axios.post(this.ApiBaseUrl + '/users', params);

    return response;
  }

  async search(search) {
    const response = await axios.get(this.ApiBaseUrl  + `/users?search=${search}`, {headers: { authorization: this.token} });
  
    return response;
  }
}

export default UserService;
