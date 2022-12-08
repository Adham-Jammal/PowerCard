import http from "../helpers/http-service";

class ItemService {
  async search(text, locale) {
    const result = await http.get("/items/search", {
      params: {
        lang: locale,
        text: text,
      },
    });
    return result.data;
  }

  async getMostSellingProducts(locale) {
    const result = await http.get("/items/most-selling", {
      params: {
        lang: locale,
      },
    });

    return result.data.data;
  }
  async getMostPopularProducts(locale) {
    const result = await http.get("/items/most-popular", {
      params: {
        lang: locale,
      },
    });
    return result.data.data;
  }
  async getBuyAndWinsProducts(locale) {
    const result = await http.get("/items/point", {
      params: {
        lang: locale,
      },
    });

    return result.data?.data;
  }

  async getProductDetails(id, locale) {
    const result = await http.get(`/item/${id}`, {
      params: {
        lang: locale,
      },
    });

    return result.data?.data || null;
  }
  async getItemsByCategory(id, locale, sub) {
    let result = undefined;
    if (sub) {
      result = await http.get(`/items_by_category/${id}/${sub}`, {
        params: {
          lang: locale,
        },
      });
      return result.data.data;
    }
    result = await http.get(`/items_by_category/${id}`, {
      params: {
        lang: locale,
      },
    });

    return result.data.data;
  }
  async getItemsByExternalCategory(id, locale) {
    const result = await http.get(`/external_items`, {
      params: {
        lang: locale,
        category_id: id,
        type: "likecard",
      },
    });

    return result.data.data || null;
  }
  async getItemsByExternalItem(id, locale) {
    const result = await http.get(`/external_items`, {
      params: {
        lang: locale,
        ids: [id],
        type: "likecard",
      },
    });
    return result.data?.data[0] || null;
  }
}

export default new ItemService();
