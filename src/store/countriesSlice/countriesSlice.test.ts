import { configureStore } from '@reduxjs/toolkit/react';
import { selectCountries } from './countriesSlice.selectors';
import { describe, expect, it } from 'vitest';
import { countriesReducer } from '@/store/countriesSlice/countriesSlice';
import { submissionsReducer } from '@/store/submissionsSlice/submissionsSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
      countries: countriesReducer,
    },
  });

describe('countriesSlice', () => {
  it('has a non-empty countries list', () => {
    const store = makeStore();
    const countries = selectCountries(store.getState());
    expect(countries.length).toBeGreaterThan(0);
  });

  it('contains expected countries', () => {
    const store = makeStore();
    const countries = selectCountries(store.getState());
    expect(countries).toContain('Germany');
    expect(countries).toContain('United States');
    expect(countries).toContain('Ukraine');
  });

  it('countries are strings', () => {
    const store = makeStore();
    const countries = selectCountries(store.getState());
    countries.forEach((c) => expect(typeof c).toBe('string'));
  });
});
