import http from "../helpers/http-service";

class WalletService {
  async addInvoice(input) {
    const result = await http.post("/add_wallet_pay", input);
    return result.data;
  }

  async checkWallet(input) {
    const result = await http.post("/wallet/check", input);
    return result.data;
  }

  async getInvoice(order_id, transaction_no) {
    const result = await http.get("/get_wallet_pay", {
      params: {
        order_id: order_id,
        transaction_no: transaction_no,
      },
    });
    return result.data;
  }

  async getWallet(page = undefined) {
    const result = await http.get("/get_wallet", {
      params: {
        page: page,
      },
    });
    return result.data;
  }
}

export default new WalletService();
