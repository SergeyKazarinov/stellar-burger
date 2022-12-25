import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const scrollSlice = createSlice ({
  name: 'scroll',
  initialState: {
    scrollValue: 0,
  },
  reducers: {
    setScrollValue(state, action: PayloadAction<number>) {
      state.scrollValue = action.payload;
    }
  }
})

export default scrollSlice.reducer;
export const { setScrollValue } = scrollSlice.actions;