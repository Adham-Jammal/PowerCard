import http from "../helpers/http-service";

class AuthService {
  async signUp(input) {
    const result = await http.post("/signup_mail", null, {
      params: {
        ...input,
      },
    });
    return result;
  }
  async verifyAccount(input) {
    const result = await http.post("/send_link", input);
    return result;
  }

  async signIn(input) {
    const result = await http.get("/login", {
      params: {
        ...input,
      },
    });

    return result.data;
  }
  async forgetPassword(input) {
    const result = await http.post("/forget_password", {
      ...input,
    });

    return result.data;
  }

  async confirmForgetPassword(input) {
    const result = await http.post("/confirm_password", {
      ...input,
    });

    return result.data;
  }
}

export default new AuthService();
