import http from "../helpers/http-service";

class HomeService {
  async getStatistics() {
    const result = await http.get("/statistics");
    return result.data?.data || [];
  }
  async getBanner(locale) {
    const result = await http.get("/banner", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
  async getSetting() {
    const result = await http.get("/setting", {
      // params: {
      //   lang: locale,
      // },
    });
    return result.data?.data[0] || [];
  }

  async getReviews(locale) {
    const result = await http.get("/client/reviews", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
  async getCoupons(locale) {
    const result = await http.get("/coupons", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
  async getInfo(locale) {
    const result = await http.get("/about", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }
}

export default new HomeService();
