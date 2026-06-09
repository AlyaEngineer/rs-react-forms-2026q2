import { configureStore } from '@reduxjs/toolkit/react';
import { countriesReducer } from './countriesSlice/countriesSlice';
import { submissionsReducer } from './submissionsSlice/submissionsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    submissions: submissionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
