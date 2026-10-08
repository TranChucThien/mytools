import type { Lang, Localized } from '../../lib/types';
import type { Direction } from './logic';

export interface Unit {
  /** Symbol used in sentences and tables, e.g. "kg", "°C"; localized when languages differ. */
  symbol: string | Localized;
  /** Short English label for titles, e.g. "KG", "Inches". */
  short: string;
  name: Localized;
}

/**
 * Two units related by `to = from × factor + offset`.
 * Each pair produces two pages (forward: from→to, reverse: to→from) per language.
 * Pages without a hand-written `<id>.<lang>.md` get generated content (see article.ts).
 */
export interface UnitPair {
  id: string;
  /** Tabler icon name. */
  icon: string;
  factor: number;
  offset?: number;
  from: Unit;
  to: Unit;
  /** Tool ids of the generated pages; also the content file names. */
  ids: Record<Direction, string>;
  slug: Record<Direction, Localized>;
  /** One or two sentences about the units, shown in generated content. */
  about: Localized;
  /** A typical value people search for, per direction ("5 km to miles"). */
  common: Record<Direction, number>;
  /** Custom conversion-table inputs; defaults to 1–10, 15, 20 … 100. */
  table?: Partial<Record<Direction, number[]>>;
}

export const PAIRS: UnitPair[] = [
  {
    id: 'kg-lbs',
    icon: 'scale',
    // International avoirdupois pound is defined as exactly 0.45359237 kg.
    factor: 1 / 0.45359237,
    from: { symbol: 'kg', short: 'KG', name: { vi: 'kilôgam', en: 'kilograms' } },
    to: { symbol: 'lbs', short: 'LBS', name: { vi: 'pound', en: 'pounds' } },
    ids: { forward: 'kg-to-lbs', reverse: 'lbs-to-kg' },
    slug: {
      forward: { vi: 'doi-kg-sang-lbs', en: 'kg-to-lbs' },
      reverse: { vi: 'doi-lbs-sang-kg', en: 'lbs-to-kg' },
    },
    about: {
      vi: 'Pound (lbs) là đơn vị khối lượng phổ biến ở Mỹ, bằng đúng 0,45359237 kg theo định nghĩa quốc tế năm 1959.',
      en: 'The pound (lb) is defined as exactly 0.45359237 kg by the 1959 international agreement.',
    },
    common: { forward: 60, reverse: 150 },
  },
  {
    id: 'cm-inch',
    icon: 'ruler-2',
    factor: 1 / 2.54,
    from: { symbol: 'cm', short: 'CM', name: { vi: 'xentimét', en: 'centimeters' } },
    to: { symbol: 'inch', short: 'Inches', name: { vi: 'inch', en: 'inches' } },
    ids: { forward: 'cm-to-inches', reverse: 'inches-to-cm' },
    slug: {
      forward: { vi: 'doi-cm-sang-inch', en: 'cm-to-inches' },
      reverse: { vi: 'doi-inch-sang-cm', en: 'inches-to-cm' },
    },
    about: {
      vi: 'Inch là đơn vị đo chiều dài của hệ Anh-Mỹ, bằng đúng 2,54 cm. Bạn sẽ gặp inch khi xem kích thước màn hình tivi, điện thoại, laptop, cỡ vành xe hay size quần jeans.',
      en: 'One inch is exactly 2.54 cm by international definition. Inches are used for screen sizes, jeans waist sizes and wheel diameters, while most of the world measures in centimeters.',
    },
    common: { forward: 100, reverse: 32 },
  },
  {
    id: 'm-ft',
    icon: 'ruler-measure',
    factor: 1 / 0.3048,
    from: { symbol: 'm', short: 'Meters', name: { vi: 'mét', en: 'meters' } },
    to: { symbol: 'ft', short: 'Feet', name: { vi: 'feet', en: 'feet' } },
    ids: { forward: 'meters-to-feet', reverse: 'feet-to-meters' },
    slug: {
      forward: { vi: 'doi-met-sang-feet', en: 'meters-to-feet' },
      reverse: { vi: 'doi-feet-sang-met', en: 'feet-to-meters' },
    },
    about: {
      vi: 'Foot (số nhiều là feet, ký hiệu ft) bằng đúng 0,3048 m và bằng 12 inch. Feet được dùng để ghi chiều cao người ở Mỹ, Anh và độ cao bay trong hàng không.',
      en: 'One foot is exactly 0.3048 m (12 inches). Feet are used for human height in the US and UK, room dimensions and aircraft altitude.',
    },
    common: { forward: 1.7, reverse: 6 },
  },
  {
    id: 'km-mi',
    icon: 'road',
    factor: 1 / 1.609344,
    from: { symbol: 'km', short: 'KM', name: { vi: 'kilômét', en: 'kilometers' } },
    to: { symbol: { vi: 'dặm', en: 'mi' }, short: 'Miles', name: { vi: 'dặm', en: 'miles' } },
    ids: { forward: 'km-to-miles', reverse: 'miles-to-km' },
    slug: {
      forward: { vi: 'doi-km-sang-dam', en: 'km-to-miles' },
      reverse: { vi: 'doi-dam-sang-km', en: 'miles-to-km' },
    },
    about: {
      vi: 'Dặm (mile) quốc tế bằng đúng 1,609344 km. Mỹ và Anh dùng dặm cho khoảng cách đường bộ và biển báo tốc độ, còn người chạy bộ hay quy đổi cự ly 5 km, 10 km sang dặm.',
      en: 'The international mile is exactly 1.609344 km. Miles are used for road distances in the US and UK, and runners often convert race distances such as 5K and 10K.',
    },
    common: { forward: 5, reverse: 26.2 },
  },
  {
    id: 'g-oz',
    icon: 'weight',
    factor: 1 / 28.349523125,
    from: { symbol: 'g', short: 'Grams', name: { vi: 'gam', en: 'grams' } },
    to: { symbol: 'oz', short: 'Ounces', name: { vi: 'ounce', en: 'ounces' } },
    ids: { forward: 'grams-to-ounces', reverse: 'ounces-to-grams' },
    slug: {
      forward: { vi: 'doi-gam-sang-ounce', en: 'grams-to-ounces' },
      reverse: { vi: 'doi-ounce-sang-gam', en: 'ounces-to-grams' },
    },
    about: {
      vi: 'Ounce (oz) thông dụng bằng đúng 28,349523125 g và 16 oz bằng 1 pound. Đừng nhầm với ounce vàng (troy ounce, khoảng 31,1 g) hay fluid ounce dùng để đo thể tích.',
      en: 'The avoirdupois ounce is exactly 28.349523125 g, and 16 oz make a pound. It is different from the troy ounce used for gold (about 31.1 g) and the fluid ounce, which measures volume.',
    },
    common: { forward: 100, reverse: 16 },
    table: { forward: [1, 5, 10, 20, 50, 100, 150, 200, 250, 300, 500, 750, 1000] },
  },
  {
    id: 'l-gal',
    icon: 'droplet',
    factor: 1 / 3.785411784,
    from: { symbol: { vi: 'lít', en: 'L' }, short: 'Liters', name: { vi: 'lít', en: 'liters' } },
    to: { symbol: 'gal', short: 'Gallons', name: { vi: 'gallon (Mỹ)', en: 'US gallons' } },
    ids: { forward: 'liters-to-gallons', reverse: 'gallons-to-liters' },
    slug: {
      forward: { vi: 'doi-lit-sang-gallon', en: 'liters-to-gallons' },
      reverse: { vi: 'doi-gallon-sang-lit', en: 'gallons-to-liters' },
    },
    about: {
      vi: 'Công cụ dùng gallon Mỹ, bằng đúng 3,785411784 lít. Gallon Anh (imperial) lớn hơn, bằng 4,54609 lít, nên khi đọc tài liệu của Anh cần lưu ý.',
      en: 'This converter uses the US liquid gallon, exactly 3.785411784 liters. The UK imperial gallon is larger at 4.54609 liters.',
    },
    common: { forward: 20, reverse: 5 },
  },
  {
    id: 'mb-gb',
    icon: 'database',
    factor: 1 / 1024,
    from: { symbol: 'MB', short: 'MB', name: { vi: 'megabyte', en: 'megabytes' } },
    to: { symbol: 'GB', short: 'GB', name: { vi: 'gigabyte', en: 'gigabytes' } },
    ids: { forward: 'mb-to-gb', reverse: 'gb-to-mb' },
    slug: {
      forward: { vi: 'doi-mb-sang-gb', en: 'mb-to-gb' },
      reverse: { vi: 'doi-gb-sang-mb', en: 'gb-to-mb' },
    },
    about: {
      vi: 'Công cụ tính 1 GB = 1024 MB, đúng như cách Windows và RAM hiển thị dung lượng. Nhà sản xuất ổ cứng lại tính 1 GB = 1000 MB, vì vậy ổ "500 GB" chỉ hiện khoảng 465 GB trong Windows.',
      en: 'This converter uses 1 GB = 1024 MB, the way Windows and RAM report sizes. Drive makers use 1 GB = 1000 MB, which is why a "500 GB" drive shows about 465 GB in Windows.',
    },
    common: { forward: 500, reverse: 4 },
    table: { forward: [1, 10, 50, 100, 128, 256, 500, 512, 1000, 1024, 2048, 4096, 5000, 8192, 10240] },
  },
  {
    id: 'kmh-mph',
    icon: 'gauge',
    factor: 1 / 1.609344,
    from: { symbol: 'km/h', short: 'km/h', name: { vi: 'kilômét/giờ', en: 'kilometers per hour' } },
    to: { symbol: 'mph', short: 'mph', name: { vi: 'dặm/giờ', en: 'miles per hour' } },
    ids: { forward: 'kmh-to-mph', reverse: 'mph-to-kmh' },
    slug: {
      forward: { vi: 'doi-km-h-sang-mph', en: 'kmh-to-mph' },
      reverse: { vi: 'doi-mph-sang-km-h', en: 'mph-to-kmh' },
    },
    about: {
      vi: 'Mph (dặm/giờ) là đơn vị tốc độ dùng trên biển báo và đồng hồ xe ở Mỹ, Anh. 1 mph bằng đúng 1,609344 km/h.',
      en: 'Miles per hour is the speed unit on road signs and speedometers in the US and UK. 1 mph is exactly 1.609344 km/h.',
    },
    common: { forward: 100, reverse: 60 },
    table: {
      forward: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 150, 200],
      reverse: [10, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 100],
    },
  },
  {
    id: 'c-f',
    icon: 'temperature',
    factor: 9 / 5,
    offset: 32,
    from: { symbol: '°C', short: 'Celsius', name: { vi: 'độ C', en: 'Celsius' } },
    to: { symbol: '°F', short: 'Fahrenheit', name: { vi: 'độ F', en: 'Fahrenheit' } },
    ids: { forward: 'celsius-to-fahrenheit', reverse: 'fahrenheit-to-celsius' },
    slug: {
      forward: { vi: 'doi-do-c-sang-do-f', en: 'celsius-to-fahrenheit' },
      reverse: { vi: 'doi-do-f-sang-do-c', en: 'fahrenheit-to-celsius' },
    },
    about: {
      vi: 'Nước đóng băng ở 0 °C (32 °F) và sôi ở 100 °C (212 °F) tại mực nước biển. Hai thang đo bằng nhau đúng tại -40 độ. Độ F vẫn được dùng trong dự báo thời tiết và nhiệt kế ở Mỹ.',
      en: 'Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F) at sea level, and the two scales meet at -40. Fahrenheit is still used for weather and body temperature in the US.',
    },
    common: { forward: 37, reverse: 100 },
    table: {
      forward: [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 36.5, 37, 38, 39, 40, 50, 100, 180, 200],
      reverse: [-40, 0, 10, 20, 32, 50, 60, 70, 80, 90, 98.6, 100, 104, 212, 350, 400],
    },
  },
  {
    id: 'm2-ft2',
    icon: 'dimensions',
    factor: 1 / 0.09290304,
    from: { symbol: 'm²', short: 'm²', name: { vi: 'mét vuông', en: 'square meters' } },
    to: { symbol: 'ft²', short: 'ft²', name: { vi: 'feet vuông', en: 'square feet' } },
    ids: { forward: 'square-meters-to-square-feet', reverse: 'square-feet-to-square-meters' },
    slug: {
      forward: { vi: 'doi-m2-sang-feet-vuong', en: 'square-meters-to-square-feet' },
      reverse: { vi: 'doi-feet-vuong-sang-m2', en: 'square-feet-to-square-meters' },
    },
    about: {
      vi: '1 feet vuông (ft², sq ft) bằng đúng 0,09290304 m². Đơn vị này hay xuất hiện trong tin rao bán nhà, căn hộ ở Mỹ, Canada và các bản vẽ nội thất nước ngoài.',
      en: 'One square foot is exactly 0.09290304 m². It is the standard area unit in US and Canadian real-estate listings and floor plans.',
    },
    common: { forward: 50, reverse: 1000 },
    table: {
      forward: [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200, 500],
      reverse: [10, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 5000],
    },
  },
  {
    id: 'ha-m2',
    icon: 'plant-2',
    factor: 10000,
    from: { symbol: 'ha', short: 'Hectares', name: { vi: 'hecta', en: 'hectares' } },
    to: { symbol: 'm²', short: 'm²', name: { vi: 'mét vuông', en: 'square meters' } },
    ids: { forward: 'hectares-to-square-meters', reverse: 'square-meters-to-hectares' },
    slug: {
      forward: { vi: 'doi-hecta-sang-m2', en: 'hectares-to-square-meters' },
      reverse: { vi: 'doi-m2-sang-hecta', en: 'square-meters-to-hectares' },
    },
    about: {
      vi: '1 hecta (ha) bằng 10.000 m², tức một hình vuông cạnh 100 m. 1 km² bằng 100 ha. Hecta thường dùng để ghi diện tích đất nông nghiệp, rừng, khu công nghiệp.',
      en: 'One hectare is 10,000 m², a square 100 m on each side, and 1 km² equals 100 hectares. Hectares are used for farmland, forests and large building plots.',
    },
    common: { forward: 2.5, reverse: 5000 },
    table: {
      forward: [0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 5, 10, 20, 50, 100],
      reverse: [100, 500, 1000, 2000, 2500, 5000, 7500, 10000, 15000, 20000, 50000, 100000],
    },
  },
];

export function sym(unit: Unit, lang: Lang): string {
  return typeof unit.symbol === 'string' ? unit.symbol : unit.symbol[lang];
}

export function getPair(id: string): UnitPair {
  const pair = PAIRS.find((p) => p.id === id);
  if (!pair) throw new Error(`Unknown unit pair "${id}"`);
  return pair;
}
