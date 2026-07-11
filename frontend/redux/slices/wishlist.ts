import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const getWishlist = () => {
//   if (typeof window === "undefined") return [];

//   return JSON.parse(localStorage.getItem("wishlist") || "[]");
// };

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize from local Storage
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },

    addToWishlist(state, action) {
      const item = state.wishlist.find(
        (item) => item._id === action.payload._id,
      );

      if (!item) {
        state.wishlist?.push(action.payload);
        toast.success("Product added to Wishlist");
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },

    removeFromWishlist(state, action) {
      // action.payload == id of item
      state.wishlist = state.wishlist?.filter(
        (item) => item?._id != action.payload,
      );

      // toast.success("Product removed from Wishlist");
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
