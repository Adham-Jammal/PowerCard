import http from "../helpers/http-service";

class OrderService {
  async addRate(input) {
    const result = await http.post("/opinion/add", input);
    return result.data;
  }

  async addInvoice(input) {
    if (!input.repay) {
      const res = await http.post("/create_order", input);
      input.order_id = res.data.order_id;
    }

    const result = await http.post("/add_invoice_pay", input);
    return result.data;
  }

  async cancelOrder(order_id) {
    const result = await http.get("/order/cancel", {
      params: {
        order_id: order_id,
      },
    });
    return result.data;
  }

  async checkOrder(input) {
    const result = await http.post("/order/check", input);
    return result.data;
  }

  async getInvoice(order_id, transaction_no) {
    const result = await http.get("/get_invoice_pay", {
      params: {
        order_id: order_id,
        transaction_no: transaction_no,
      },
    });
    return result.data;
  }

  async getOrders(page = undefined) {
    const result = await http.get("/orders", {
      params: {
        page: page,
      },
    });
    return result.data;
  }
}

export default new OrderService();
