/** Browser-side helpers shared by tool scripts. */

/** Read JSON passed from the server in a data-config attribute. */
export function readConfig<T>(root: HTMLElement): T {
  return JSON.parse(root.dataset.config ?? '{}') as T;
}

export function $<T extends Element = HTMLElement>(root: ParentNode, selector: string): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element ${selector}`);
  return el;
}

/** Wire a copy button: copies getText() and briefly shows the "copied" label. */
export function setupCopy(button: HTMLButtonElement, getText: () => string, copiedLabel: string): void {
  const original = button.textContent;
  button.addEventListener('click', async () => {
    const text = getText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (e.g. insecure context): fall back to a hidden textarea.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    button.textContent = copiedLabel;
    setTimeout(() => (button.textContent = original), 1500);
  });
}

export function setError(input: HTMLInputElement, invalid: boolean): void {
  if (invalid) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Show a one-liner in the Quip inside `root`, or hide it for an empty string. */
export function setQuip(root: ParentNode, text: string): void {
  const el = root.querySelector<HTMLElement>('[data-quip]');
  if (!el) return;
  el.hidden = text === '';
  el.querySelector('[data-quip-text]')!.textContent = text;
}
