import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const getCartItems = () => {
//   if (typeof window === "undefined") return [];

//   return JSON.parse(localStorage.getItem("cartItems") || "[]");
// };

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize from local Storage
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },

    clearCart(state) {
      state.cartItems = [];
    },

    addToCart(state, action) {
      const { quantity = 1 } = action.payload;

      const item = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (item) {
        if (item.quantity + quantity <= item.stock) {
          item.quantity += quantity;
          toast.success("Cart updated.");
        } else {
          toast.error("Product stock limited!");
        }
      } else {
        if (quantity <= action.payload.stock) {
          state.cartItems.push({
            ...action.payload,
            quantity,
          });

          toast.success("Added to cart.");
        } else {
          toast.error("Product stock limited!");
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementCartItem(state, action) {
      // action.payload == item
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (item) {
        if (item?.quantity < item?.stock) {
          item.quantity += 1;
        } else {
          toast.error("Product stock limited!");
        }
      } else {
        state.cartItems.push(action.payload);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      // action.payload == id of item
      state.cartItems = state.cartItems?.filter(
        (item) => item?._id != action.payload,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrementCartItem(state, action) {
      // action.payload == id of item
      const item = state.cartItems.find((item) => item._id === action.payload);

      if (item?.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  setCartItems,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
