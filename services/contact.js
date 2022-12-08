import http from "../helpers/http-service";

class ContactService {
  async sendMessage(input) {
    const result = await http.post("/contact", input);
    return result;
  }
}

export default new ContactService();
