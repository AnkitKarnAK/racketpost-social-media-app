import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage?.setItem(
        "user",
        JSON.stringify({
          user: action.payload,
        })
      );
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage?.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
