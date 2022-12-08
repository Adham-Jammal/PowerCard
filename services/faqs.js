import http from "../helpers/http-service";

class FAQsService {
  async getFAQs(locale) {
    const result = await http.get("/faq", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
}

export default new FAQsService();
