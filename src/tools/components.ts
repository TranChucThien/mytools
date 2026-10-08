import type { ToolMeta } from '../lib/types';
import Percentage from './percentage/Tool.astro';
import QrCode from './qr-code/Tool.astro';
import RandomNumber from './random-number/Tool.astro';
import UnitConverter from './unit-converter/Tool.astro';

/** UI component for each ToolMeta.component key. */
export const TOOL_COMPONENTS: Record<ToolMeta['component'], typeof Percentage> = {
  percentage: Percentage,
  'unit-converter': UnitConverter,
  'random-number': RandomNumber,
  'qr-code': QrCode,
};
