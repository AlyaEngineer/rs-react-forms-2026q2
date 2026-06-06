import type { RootState } from '@/store/store';

export const selectSubmissions = (state: RootState) => state.submissions.items;
