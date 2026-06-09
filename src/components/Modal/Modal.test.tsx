import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Modal from '@/components/Modal/Modal';

const onClose = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const renderModal = (isOpen: boolean) =>
  render(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Test Modal"
      testId="test-modal"
    >
      <p>Modal content</p>
    </Modal>
  );

describe('Modal rendering', () => {
  it('renders nothing when isOpen is false', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders title and children', () => {
    renderModal(true);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders via portal into document.body', () => {
    renderModal(true);
    const dialog = screen.getByRole('dialog');
    expect(document.body.contains(dialog)).toBe(true);
  });

  it('has aria-modal and aria-labelledby attributes', () => {
    renderModal(true);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('renders with testId', () => {
    renderModal(true);
    expect(screen.getByTestId('test-modal')).toBeInTheDocument();
  });
});

describe('Modal closing', () => {
  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    renderModal(true);
    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when overlay is clicked', () => {
    renderModal(true);
    const overlay = screen.getByRole('dialog').parentElement!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when dialog itself is clicked', () => {
    renderModal(true);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('Modal accessibility', () => {
  it('closes on Escape key', async () => {
    renderModal(true);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  it('dialog has tabIndex -1 for focus management', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1');
  });
});
