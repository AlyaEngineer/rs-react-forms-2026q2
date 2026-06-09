import { configureStore } from '@reduxjs/toolkit/react';
import { addSubmission, submissionsReducer } from './submissionsSlice';
import { selectSubmissions } from './submissionsSlice.selectors';
import { describe, expect, it } from 'vitest';
import { countriesReducer } from '@/store/countriesSlice/countriesSlice';
import type { FormData as AppFormData } from '@/types/formTypes';

const makeStore = () =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
      countries: countriesReducer,
    },
  });

const makeSubmission = (overrides?: Partial<AppFormData>): AppFormData => ({
  id: 'test-id-1',
  formType: 'rhf',
  name: 'Alice',
  age: '25',
  email: 'alice@example.com',
  gender: 'Female',
  password: 'Secret1!',
  image: 'data:image/png;base64,abc',
  country: 'Germany',
  isTermsAccepted: true,
  submittedAt: 1000,
  ...overrides,
});

describe('submissionsSlice', () => {
  it('starts with empty items', () => {
    const store = makeStore();
    expect(selectSubmissions(store.getState())).toEqual([]);
  });

  it('addSubmission prepends item to the list', () => {
    const store = makeStore();
    const submission = makeSubmission();
    store.dispatch(addSubmission(submission));
    const items = selectSubmissions(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(submission);
  });

  it('addSubmission prepends - newest item is first', () => {
    const store = makeStore();
    const first = makeSubmission({ id: 'id-1', name: 'Alice' });
    const second = makeSubmission({ id: 'id-2', name: 'Bob' });
    store.dispatch(addSubmission(first));
    store.dispatch(addSubmission(second));
    const items = selectSubmissions(store.getState());
    expect(items[0].name).toBe('Bob');
    expect(items[1].name).toBe('Alice');
  });

  it('stores multiple submissions', () => {
    const store = makeStore();
    store.dispatch(addSubmission(makeSubmission({ id: 'id-1' })));
    store.dispatch(addSubmission(makeSubmission({ id: 'id-2' })));
    expect(selectSubmissions(store.getState())).toHaveLength(2);
  });

  it('stores both form types', () => {
    const store = makeStore();
    store.dispatch(
      addSubmission(makeSubmission({ id: 'id-1', formType: 'uncontrolled' }))
    );
    store.dispatch(
      addSubmission(makeSubmission({ id: 'id-2', formType: 'rhf' }))
    );
    const items = selectSubmissions(store.getState());
    expect(items.map((i) => i.formType)).toContain('uncontrolled');
    expect(items.map((i) => i.formType)).toContain('rhf');
  });
});
