import { MemoizedPromise, MemoizeOptions } from '../../data/memoizedPromise';
import { Include } from '../../utils';

type Public<T> = Include<MemoizedPromise<T>, any>;

/* eslint-disable @typescript-eslint/no-unused-vars */

export function options(x: MemoizeOptions) {}
export function output<T>(x: Public<T>) {}
