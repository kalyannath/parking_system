import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProgressBarState = {
  state: boolean;
};

const initialState: ProgressBarState = {
  state: false,
};

export const ProgressBarStateToggle = createSlice({
  name: "ProgressBarState",
  initialState,
  reducers: {
    toggleProgressBar: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const { toggleProgressBar } = ProgressBarStateToggle.actions;
export default ProgressBarStateToggle.reducer;

