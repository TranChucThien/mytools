import { describe, expect, it } from 'vitest';
import { cleanMessage, crc16, tlv, validateVietQr, vietQrPayload } from './logic';

/** Top-level tag ids of an EMVCo payload. */
function tags(payload: string): string[] {
  const ids: string[] = [];
  for (let i = 0; i < payload.length; ) {
    const len = Number(payload.slice(i + 2, i + 4));
    ids.push(payload.slice(i, i + 2));
    i += 4 + len;
  }
  return ids;
}

describe('crc16 (CCITT-FALSE)', () => {
  it('matches the standard check value', () => {
    expect(crc16('123456789')).toBe('29B1');
  });
});

describe('vietQrPayload', () => {
  it('builds a static code without amount', () => {
    const p = vietQrPayload({ bin: '970436', account: '0123456789' });
    expect(p.startsWith('000201010211')).toBe(true);
    expect(p).toContain(tlv('38', tlv('00', 'A000000727') + tlv('01', tlv('00', '970436') + tlv('01', '0123456789')) + tlv('02', 'QRIBFTTA')));
    expect(p).toContain('5303704');
    expect(p).toContain('5802VN');
    expect(tags(p)).toEqual(['00', '01', '38', '53', '58', '63']);
    expect(p.slice(-8, -4)).toBe('6304');
    expect(crc16(p.slice(0, -4))).toBe(p.slice(-4));
  });
  it('builds a dynamic code with amount and message', () => {
    const p = vietQrPayload({ bin: '970418', account: '12345', amount: 150000, message: 'Thanh toan don 42' });
    expect(p.startsWith('000201010212')).toBe(true);
    expect(p).toContain('5406150000');
    expect(p).toContain(tlv('62', tlv('08', 'Thanh toan don 42')));
    expect(tags(p)).toEqual(['00', '01', '38', '53', '54', '58', '62', '63']);
  });
});

describe('cleanMessage', () => {
  it('removes accents and unsupported characters and limits length', () => {
    expect(cleanMessage('Chuyển tiền ăn trưa #3!')).toBe('Chuyen tien an trua 3');
    expect(cleanMessage('a'.repeat(80))).toHaveLength(50);
  });
});

describe('validateVietQr', () => {
  it('checks account and amount', () => {
    expect(validateVietQr({ bin: '970436', account: '' })).toBe('account');
    expect(validateVietQr({ bin: '970436', account: '01234 56' })).toBe('account');
    expect(validateVietQr({ bin: '970436', account: '0123', amount: 0 })).toBe('amount');
    expect(validateVietQr({ bin: '970436', account: '0123', amount: 1.5 })).toBe('amount');
    expect(validateVietQr({ bin: '970436', account: '0123', amount: 100 })).toBeNull();
  });
});
