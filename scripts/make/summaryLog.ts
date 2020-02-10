import c from 'ansi-colors';
import { MakeOptions } from './types';
import { ERROR_SYMBOL, log, SUCCESS_SYMBOL } from './utils/logUtils';

const checkOrCross = (bool: boolean, ifTrue: string, ifFalse: string) => {
  const symbol = bool ? c.green(SUCCESS_SYMBOL) : c.red(ERROR_SYMBOL);
  const text = bool ? ifTrue : ifFalse;
  return `${symbol} ${c.dim(`- ${text}`)}`;
};

/**
 * Log a summary of your options.
 */
export const summaryLog = ({ isRef, componentName }: MakeOptions) => {
  const componentInfo = `
Component information:
${c.dim('Component name:')} ${c.yellow(`${componentName}`)}`;

  const forwardsRef = `
${c.dim('Forwards ref:')}   ${checkOrCross(isRef, 'Will forward a ref to inner component', "Won't forward a ref")}`;

  log(componentInfo + forwardsRef + '\n');
};
