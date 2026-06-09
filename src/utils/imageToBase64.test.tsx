import { imageToBase64 } from './imageToBase64';
import { describe, expect, it, vi, afterEach } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('imageToBase64', () => {
  it('resolves with base64 string', async () => {
    const fakeResult = 'data:image/png;base64,abc123';

    vi.stubGlobal(
      'FileReader',
      class {
        result = fakeResult;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onload?.(), 0);
        }
      }
    );

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const result = await imageToBase64(file);
    expect(result).toBe(fakeResult);
  });

  it('rejects when result is not a string', async () => {
    vi.stubGlobal(
      'FileReader',
      class {
        result = new ArrayBuffer(8);
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onload?.(), 0);
        }
      }
    );

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await expect(imageToBase64(file)).rejects.toThrow(
      'Failed to convert image to base64'
    );
  });

  it('rejects on reader error', async () => {
    vi.stubGlobal(
      'FileReader',
      class {
        result = null;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onerror?.(), 0);
        }
      }
    );

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await expect(imageToBase64(file)).rejects.toThrow('Failed to read file');
  });
});
