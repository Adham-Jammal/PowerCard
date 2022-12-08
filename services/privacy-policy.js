import http from "../helpers/http-service";

class PrivacyPolicyService {
  async getPrivacy(locale) {
    const result = await http.get("/privacy", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }

  async getTerms(locale) {
    const result = await http.get("/terms", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
}

export default new PrivacyPolicyService();
