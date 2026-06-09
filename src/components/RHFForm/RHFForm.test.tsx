import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RHFForm from '@/components/RHFForm/RHFForm';
import { selectSubmissions } from '@/store/submissionsSlice/submissionsSlice.selectors';
import { renderWithStore } from '@/__test__/test-utils';

const onClose = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const fillValidForm = async () => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Name'), 'Alice');
  await user.type(screen.getByLabelText('Age'), '25');
  await user.type(screen.getByLabelText('Email'), 'alice@example.com');
  await user.selectOptions(screen.getByLabelText('Gender'), 'Female');
  await user.type(screen.getByLabelText('Country'), 'Germany');
  await user.type(screen.getByLabelText('Password'), 'Secret1!');
  await user.type(screen.getByLabelText('Confirm Password'), 'Secret1!');
  await user.click(screen.getByLabelText('I accept the Terms & Conditions'));

  const file = new File(['img'], 'photo.png', { type: 'image/png' });
  await user.upload(screen.getByLabelText('Upload a file'), file);
};

describe('RHFForm - rendering', () => {
  it('renders all form fields', () => {
    renderWithStore(<RHFForm onClose={onClose} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByLabelText('I accept the Terms & Conditions')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('submit button is disabled initially', () => {
    renderWithStore(<RHFForm onClose={onClose} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('calls onClose when Cancel is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(<RHFForm onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('shows error for lowercase name', async () => {
    const user = userEvent.setup();
    renderWithStore(<RHFForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'alice');

    await waitFor(() => {
      expect(
        screen.getByText(/First letter must be uppercase/)
      ).toBeInTheDocument();
    });
  });

  it('shows email error for invalid email', async () => {
    const user = userEvent.setup();
    renderWithStore(<RHFForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Email'), 'notanemail');

    await waitFor(() => {
      expect(
        screen.getByText('Email must contain exactly one @')
      ).toBeInTheDocument();
    });
  });

  it('shows password length error', async () => {
    const user = userEvent.setup();
    renderWithStore(<RHFForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Password'), 'ab');

    await waitFor(() => {
      expect(screen.getByText(/at least/)).toBeInTheDocument();
    });
  });

  it('submit button becomes enabled when form is valid', async () => {
    renderWithStore(<RHFForm onClose={onClose} />);
    await fillValidForm();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
    });
  });

  it('dispatches submission and calls onClose on valid submit', async () => {
    vi.stubGlobal(
      'FileReader',
      class {
        result = 'data:image/png;base64,abc';
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onload?.(), 0);
        }
      }
    );

    const { store } = renderWithStore(<RHFForm onClose={onClose} />);
    await fillValidForm();

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toBe('Alice');
    expect(submissions[0].formType).toBe('rhf');

    vi.unstubAllGlobals();
  });
});
