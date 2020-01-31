import { MemoizedPromise, MemoizeOptions } from '../../data/memoizedPromise';
import { Include } from '../../utils';

type Public<T> = Include<MemoizedPromise<T>, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

export function options(x: MemoizeOptions) {}
export function output<T>(x: Public<T>) {}
