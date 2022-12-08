import http from "../helpers/http-service";

class ProfileService {
  async updateProfile(input) {
    const result = await http.post("/update/profile", input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  }
  async updatePassword(input) {
    const result = await http.post("/update/password", input);
    return result;
  }
}

export default new ProfileService();
