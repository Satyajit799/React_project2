import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.users = action.payload;
    },
    logoutUser: (state) => {
      state.users = null;
    },
    removeUser: (state, action) => {
      if (String(state.users?.id) === String(action.payload)) {
        state.users = null;
      }
    },
  },
});

export default userSlice.reducer;
export const { loadUser, logoutUser, removeUser } = userSlice.actions;
