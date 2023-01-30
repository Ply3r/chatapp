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
}

export default FriendService;
