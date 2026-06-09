import type { RootState } from '@/store/store';

export const selectCountries = (state: RootState) => state.countries.items;
