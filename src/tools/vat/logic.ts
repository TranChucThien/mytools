export interface VatResult {
  net: number;
  vat: number;
  gross: number;
}

const clean = (n: number) => Number(n.toPrecision(12));

export function addVat(net: number, ratePercent: number): VatResult | null {
  if (net < 0 || ratePercent < 0) return null;
  const vat = clean((net * ratePercent) / 100);
  return { net, vat, gross: clean(net + vat) };
}

export function removeVat(gross: number, ratePercent: number): VatResult | null {
  if (gross < 0 || ratePercent < 0) return null;
  const net = clean(gross / (1 + ratePercent / 100));
  return { net, vat: clean(gross - net), gross };
}
