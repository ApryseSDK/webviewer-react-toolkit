import { File, FileDetails } from '../../data/file';
import { Include } from '../../utils';

type Public = Include<File, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

export function options(x: FileDetails) {}
export function output(x: Public) {}
