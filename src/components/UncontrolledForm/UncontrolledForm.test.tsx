import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from '@/components/UncontrolledForm/UncontrolledForm';
import { selectSubmissions } from '@/store/submissionsSlice/submissionsSlice.selectors';
import { renderWithStore } from '@/__test__/test-utils';
import * as imageToBase64Module from '@/utils/imageToBase64';
import * as formSchemaModule from '@/schemas/formSchema';

const onClose = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('UncontrolledForm rendering', () => {
  it('renders all form fields', () => {
    renderWithStore(<UncontrolledForm onClose={onClose} />);

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
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(<UncontrolledForm onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('UncontrolledForm validation on submit', () => {
  it('shows required errors when submitting empty form', async () => {
    renderWithStore(<UncontrolledForm onClose={onClose} />);
    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Age is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('shows uppercase error for lowercase name', async () => {
    const user = userEvent.setup();
    renderWithStore(<UncontrolledForm onClose={onClose} />);
    await user.type(screen.getByLabelText('Name'), 'alice');
    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(
        screen.getByText(/First letter must be uppercase/)
      ).toBeInTheDocument();
    });
  });

  it('shows email error for invalid email', async () => {
    const user = userEvent.setup();
    renderWithStore(<UncontrolledForm onClose={onClose} />);
    await user.type(screen.getByLabelText('Email'), 'notanemail');
    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(
        screen.getByText('Email must contain exactly one @')
      ).toBeInTheDocument();
    });
  });

  it('shows password mismatch error', async () => {
    const user = userEvent.setup();
    renderWithStore(<UncontrolledForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'Alice');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.selectOptions(screen.getByLabelText('Gender'), 'Female');
    await user.type(screen.getByLabelText('Country'), 'Germany');
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Different1!');
    await user.click(screen.getByLabelText('I accept the Terms & Conditions'));

    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('does not call onClose when form has errors', async () => {
    renderWithStore(<UncontrolledForm onClose={onClose} />);
    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('UncontrolledForm submission', () => {
  it('dispatches submission and calls onClose on valid submit', async () => {
    vi.spyOn(imageToBase64Module, 'imageToBase64').mockResolvedValue(
      'data:image/png;base64,abc'
    );

    vi.spyOn(formSchemaModule, 'createFormSchema').mockReturnValue({
      safeParse: () => ({
        success: true,
        data: {
          name: 'Alice',
          age: '25',
          email: 'alice@example.com',
          gender: 'Female',
          password: 'Secret1!',
          confirmPassword: 'Secret1!',
          image: new File(['img'], 'photo.png', { type: 'image/png' }),
          country: 'Germany',
          isTermsAccepted: true,
        },
      }),
    } as unknown as ReturnType<typeof formSchemaModule.createFormSchema>);

    const { store } = renderWithStore(<UncontrolledForm onClose={onClose} />);

    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toBe('Alice');
    expect(submissions[0].formType).toBe('uncontrolled');

    vi.restoreAllMocks();
  });
});
