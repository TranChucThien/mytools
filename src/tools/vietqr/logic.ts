import { removeDiacritics } from '../../lib/text';

export interface VietQrInput {
  /** NAPAS bank identification number, e.g. "970436". */
  bin: string;
  account: string;
  /** Whole VND; omitted for a static code. */
  amount?: number;
  message?: string;
}

export const MAX_MESSAGE = 50;
export const MAX_AMOUNT = 9_999_999_999_999;

/** EMVCo tag-length-value. */
export function tlv(id: string, value: string): string {
  return id + String(value.length).padStart(2, '0') + value;
}

/** CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF) as 4 uppercase hex digits. Input must be ASCII. */
export function crc16(s: string): string {
  let crc = 0xffff;
  for (let i = 0; i < s.length; i++) {
    crc ^= s.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/** Banks reject accents and most symbols in the transfer message. */
export function cleanMessage(s: string): string {
  return removeDiacritics(s)
    .replace(/[^A-Za-z0-9 ]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_MESSAGE);
}

export function validateVietQr(input: VietQrInput): 'bank' | 'account' | 'amount' | null {
  if (!/^\d{6}$/.test(input.bin)) return 'bank';
  if (!/^[A-Za-z0-9]{1,19}$/.test(input.account)) return 'account';
  if (input.amount !== undefined && (!Number.isInteger(input.amount) || input.amount < 1 || input.amount > MAX_AMOUNT)) return 'amount';
  return null;
}

/** VietQR (NAPAS 247 transfer to account) payload string. */
export function vietQrPayload({ bin, account, amount, message }: VietQrInput): string {
  const merchant = tlv('00', 'A000000727') + tlv('01', tlv('00', bin) + tlv('01', account)) + tlv('02', 'QRIBFTTA');
  let p = tlv('00', '01') + tlv('01', amount ? '12' : '11') + tlv('38', merchant) + tlv('53', '704');
  if (amount) p += tlv('54', String(amount));
  p += tlv('58', 'VN');
  if (message) p += tlv('62', tlv('08', message));
  p += '6304';
  return p + crc16(p);
}
