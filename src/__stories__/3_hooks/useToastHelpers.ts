import { ToastProps } from '../../components';
import { AddToast, ToastContextValue } from '../../hooks/useToast';
import { Include } from '../../utils';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

interface Test extends AddToast, Include<ToastProps, 'heading' | 'children' | 'toastType' | 'action'> {}

export function options(x: Test) {}
export function output(x: ToastContextValue) {}
