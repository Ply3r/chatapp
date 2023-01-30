import axios from "axios";
import HttpService from "./http.service";

class LoginService extends HttpService {
  constructor() {
    super();
  }

  async login(params) {
    const response = await axios.post('http://localhost:3001'+ '/login', params);

    return response;
  }

  async loginWithToken(token) {
    const response = await axios.post('http://localhost:3001'+ '/login_token', {token});

    return response;
  }
}

export default LoginService;
