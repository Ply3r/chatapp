import axios from "axios";
import HttpService from "./http.service";
import useToken from "../../stores/useToken";

class UserService extends HttpService {
  constructor() {
    super();
    this.token = useToken().getToken
  }

  async create(params) {
    const response = await axios.post('http://localhost:3001'+ '/users', params);

    return response;
  }

  async search(params) {
    const response = await axios.get('http://localhost:3001' + `/users/all?q=${params.search}`, {headers: { authorization: this.token} });
  
    return response;
  }
}

export default UserService;
