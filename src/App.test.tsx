import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { renderWithStore } from '@/__test__/test-utils';

describe('App', () => {
  it('renders main heading', () => {
    renderWithStore(<App />);
    expect(screen.getByText('React Forms')).toBeInTheDocument();
  });

  it('renders both form buttons', () => {
    renderWithStore(<App />);
    expect(
      screen.getByRole('button', { name: 'Uncontrolled Form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'React Hook Form' })
    ).toBeInTheDocument();
  });

  it('opens uncontrolled form modal on button click', async () => {
    const user = userEvent.setup();
    renderWithStore(<App />);
    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens rhf form modal on button click', async () => {
    const user = userEvent.setup();
    renderWithStore(<App />);
    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));
    expect(screen.getByTestId('rhf-modal')).toBeInTheDocument();
  });
});
