import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormData } from '@/types/formTypes';

interface SubmissionsState {
  items: FormData[];
}

const initialState: SubmissionsState = {
  items: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormData>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export const submissionsReducer = submissionsSlice.reducer;
