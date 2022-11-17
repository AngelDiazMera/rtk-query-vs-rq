import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0, // total number of todos
  totalDone: 0, // total number of todos that are done
  doneRatio: 0, // ratio of done todos
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setTotalDone: (state, action: PayloadAction<number>) => {
      const hasTodos = state.totalCount > 0;
      state.totalDone = action.payload;
      state.doneRatio = !hasTodos
        ? 0
        : (state.totalDone / state.totalCount) * 100;
    },
  },
});

export const { setTotalCount, setTotalDone } = todosSlice.actions;

export default todosSlice.reducer;
