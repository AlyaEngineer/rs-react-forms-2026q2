import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OpenFormButton from '@/components/OpenFormButton/OpenFormButton';
import { renderWithStore } from '@/__test__/test-utils';

describe('OpenFormButton', () => {
  it('renders button with title', () => {
    renderWithStore(
      <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
    );
    expect(
      screen.getByRole('button', { name: 'Uncontrolled Form' })
    ).toBeInTheDocument();
  });

  it('modal is not visible initially', () => {
    renderWithStore(
      <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal when button is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
    );
    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal when onClose is called via close button', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
    );
    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('renders RHF form when formType is rhf', async () => {
    const user = userEvent.setup();
    renderWithStore(<OpenFormButton title="React Hook Form" formType="rhf" />);
    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('rhf-modal')).toBeInTheDocument();
  });
});
