import http from "../helpers/http-service";

class CategoriesService {
  async getCategories(locale) {
    const result = await http.get("/categories", {
      params: {
        lang: locale,
      },
    });
    return result.data?.data || [];
  }

  async getExternalCategories(locale, type) {
    const result = await http.get("/external_categories", {
      params: {
        lang: locale,
        type: type,
      },
    });
    return result.data?.data || [];
  }
}

export default new CategoriesService();
