import type User from "../types/User";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
  info: User | null;
}

const initialState: State = {
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.info = action.payload;
    },

    addMovie: (state, action: PayloadAction<string>) => {
      state.info?.favorites.push(action.payload);
    },

    deleteMovie: (state, action: PayloadAction<string>) => {
      if (state.info) {
        const favoriteMovies = state.info.favorites;

        state.info.favorites = favoriteMovies.filter(
          (movieId) => movieId !== action.payload
        );
      }
    },
  },
});

export { userSlice };
export const { setUser, addMovie, deleteMovie } = userSlice.actions;
export default userSlice.reducer;
