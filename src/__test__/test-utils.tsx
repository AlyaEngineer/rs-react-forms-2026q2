import { type ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { submissionsReducer } from '@/store/submissionsSlice/submissionsSlice';
import { countriesReducer } from '@/store/countriesSlice/countriesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
      countries: countriesReducer,
    },
  });

export const renderWithStore = (ui: ReactNode) => {
  const store = makeStore();
  const result = render(<Provider store={store}>{ui}</Provider>);
  return { ...result, store };
};
