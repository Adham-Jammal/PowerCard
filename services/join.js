import http from "../helpers/http-service";

class JoinService {
  async sendJoinRequest(input) {
    const result = await http.post("/join-our-merchants", input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  }
}

export default new JoinService();
