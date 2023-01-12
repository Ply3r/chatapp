import axios from "axios";
import HttpService from "./http.service";

class UserService extends HttpService {
  constructor() {
    super();
  }

  async create(params) {
    const response = await axios.post('http://localhost:3001'+ '/users', params);

    return response;
  }
}

export default UserService;
