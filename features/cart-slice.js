import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  items_qty: 0,
  total_price: 0,
  came_from_cart: false,
  coupon: undefined,
  total_price_before_disc: 0,
  total_point: 0,
  wallet: false,
  repay: false,
  order_id: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.value = [];
      state.items_qty = 0;
      state.total_price = 0;
      state.came_from_cart = false;
      state.coupon = undefined;
      state.total_price_before_disc = 0;
      state.total_point = 0;
      state.wallet = false;
      state.repay = false;
      state.order_id = undefined;
    },
    clearCoupon: (state, action) => {
      state.coupon = undefined;
    },
    addToCart: (state, action) => {
      if (state.value.length === 0) {
        let item = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          image: action.payload.image,
          points: action.payload.points,
          userId: action.payload.userId,
          price: action.payload.price,
          companyName: action.payload.companyName,
          companyLogo: action.payload.companyLogo,
          type: action.payload.type,
          categoryId: action.payload.categoryId,
          subCategoryId: action.payload.subCategoryId,
          name_en: action.payload.name_en,
          companyName_en: action.payload.companyName_en,
          maxQuantity: action.payload.maxQuantity,
        };
        state.value.push(item);
      } else {
        let check = false;
        state.value.map((item, key) => {
          if (
            item.id == action.payload.id &&
            item.userId == action.payload.userId
          ) {
            state.value[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            userId: action.payload.userId,
            points: action.payload.points,
            companyName: action.payload.companyName,
            companyLogo: action.payload.companyLogo,
            maxQuantity: action.payload.maxQuantity,
            type: action.payload.type,
            categoryId: action.payload.categoryId,
            subCategoryId: action.payload.subCategoryId,
            name_en: action.payload.name_en,
            companyName_en: action.payload.companyName_en,
          };
          state.value.push(_cart);
        }
      }
    },
    fillCart: (state, action) => {
      let temp = [];
      action.payload.products.map((p) => {
        let item = {
          id: p.id,
          quantity: p.quantity,
          name: p.name,
          image: p.image,
          userId: action.payload.userId,
          price: p.price,
          points: p.points,
          companyName: p.companyName,
          companyLogo: p.companyLogo,
          type: p.type,
          categoryId: p.categoryId,
          subCategoryId: p.subCategoryId,
          name_en: p.name_en,
          companyName_en: p.companyName_en,
        };
        temp.push(item);
      });
      state.value = temp;
    },
    increaseQuantity: (state, action) => {
      let check = false;
      state.value.map((item, key) => {
        if (
          item.id == action.payload.id &&
          item.userId == action.payload.userId
        ) {
          check = true;
          state.value[key].quantity++;
        }
      });
      if (!check) {
        let _cart = {
          id: action.payload.id,
          quantity: 1,
          maxQuantity: action.payload.maxQuantity,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          userId: action.payload.userId,
          points: action.payload.points,
          companyName: action.payload.companyName,
          companyLogo: action.payload.companyLogo,
          type: action.payload.type,
          categoryId: action.payload.categoryId,
          name_en: action.payload.name_en,
          companyName_en: action.payload.companyName_en,
        };
        state.value.push(_cart);
      }
    },
    decreaseQuantity: (state, action) => {
      let quantity = action.payload.quantity;
      if (quantity > 0) {
        state.value.map((item, key) => {
          if (
            item.id == action.payload.id &&
            item.userId == action.payload.userId
          ) {
            state.value[key].quantity--;
          }
        });
      } else {
        state.value = state.value.filter((item) => {
          return item.id != action.payload.id;
        });
      }
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => {
        return item.id != action.payload.id;
      });
    },
    addFinalCost: (state, action) => {
      let items_qty = 0,
        total_price = 0,
        total_point = 0;
      state.value
        .filter((i) => i.userId == action.payload.userId)
        .map((item, key) => {
          items_qty += item.quantity;
          total_price += item.quantity * item.price;
          total_point += item.quantity * item.points;
        });
      state.items_qty = items_qty;
      state.came_from_cart = action.payload.came_from_cart;
      state.total_point = total_point;
      if (action.payload.wallet) state.wallet = action.payload.wallet;
      if (action.payload.repay !== undefined)
        state.repay = action.payload.repay;
      if (action.payload.order_id) state.order_id = action.payload.order_id;
      else state.order_id = undefined;
      if (action.payload.coupon) state.coupon = action.payload.coupon;
      if (action.payload.total_price) {
        state.total_price = action.payload.total_price;
        state.total_price_before_disc = total_price;
      } else {
        state.total_price = total_price;
        state.total_price_before_disc = total_price;
      }
    },
  },
});

export const {
  addToCart,
  hydrateCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCoupon,
  addFinalCost,
  clearCart,
  fillCart,
} = cartSlice.actions;

export default cartSlice.reducer;
