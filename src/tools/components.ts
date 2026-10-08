import type { ToolComponent } from '../lib/types';
import Age from './age/Tool.astro';
import Bmi from './bmi/Tool.astro';
import CaseConverter from './case-converter/Tool.astro';
import CoinFlip from './coin-flip/Tool.astro';
import Discount from './discount/Tool.astro';
import NamePicker from './name-picker/Tool.astro';
import Password from './password/Tool.astro';
import Percentage from './percentage/Tool.astro';
import QrCode from './qr-code/Tool.astro';
import RandomNumber from './random-number/Tool.astro';
import RemoveDiacritics from './remove-diacritics/Tool.astro';
import Slug from './slug/Tool.astro';
import ConverterArticle from './unit-converter/Article.astro';
import UnitConverter from './unit-converter/Tool.astro';
import Vat from './vat/Tool.astro';
import DateDifference from './date-difference/Tool.astro';
import Loan from './loan/Tool.astro';
import NumberToWords from './number-to-words/Tool.astro';
import SavingsInterest from './savings-interest/Tool.astro';
import TeamGenerator from './team-generator/Tool.astro';
import VietQr from './vietqr/Tool.astro';
import Wheel from './wheel/Tool.astro';
import WordCounter from './word-counter/Tool.astro';

type AstroComponent = typeof Percentage;

/** UI component for each ToolMeta.component key. */
export const TOOL_COMPONENTS: Record<ToolComponent, AstroComponent> = {
  percentage: Percentage,
  'unit-converter': UnitConverter,
  'random-number': RandomNumber,
  'qr-code': QrCode,
  age: Age,
  discount: Discount,
  bmi: Bmi,
  vat: Vat,
  'word-counter': WordCounter,
  'remove-diacritics': RemoveDiacritics,
  'case-converter': CaseConverter,
  slug: Slug,
  'coin-flip': CoinFlip,
  'name-picker': NamePicker,
  password: Password,
  'number-to-words': NumberToWords,
  'savings-interest': SavingsInterest,
  loan: Loan,
  'date-difference': DateDifference,
  vietqr: VietQr,
  wheel: Wheel,
  'team-generator': TeamGenerator,
};

/** Generated article for tools whose pages have no hand-written Markdown. */
export const TOOL_ARTICLES: Partial<Record<ToolComponent, AstroComponent>> = {
  'unit-converter': ConverterArticle,
};
