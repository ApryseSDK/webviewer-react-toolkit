import { File, FileDetails } from '../../data/file';
import { Include } from '../../utils';

type Public = Include<File, any>;

/* eslint-disable @typescript-eslint/no-unused-vars */

export function options(x: FileDetails) {}
export function output(x: Public) {}
