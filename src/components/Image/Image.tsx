import classnames from 'classnames';
import React, { forwardRef, ImgHTMLAttributes, ReactNode, useCallback, useEffect, useState } from 'react';
import { FuturableOrLazy, futureableOrLazyToFuturable } from '../../data';
import { Remove } from '../../utils';

export interface ImageProps extends Remove<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * The image source can be a `Futurable` or `LazyFuturable`, or undefined. If
   * undefined or if a promise will display as loading.
   */
  src?: FuturableOrLazy<string | undefined>;
  /**
   * Manually set whether image should show loading state.
   */
  pending?: boolean;
  /**
   * Render out an element to be shown while src is loading.
   */
  onRenderLoading?(): ReactNode;
  /**
   * Render out an element to be shown if the image fails to load src, or src
   * is falsy.
   */
  onRenderFallback?(): ReactNode;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, pending, onRenderLoading, onRenderFallback, alt, className, ...imgProps }, ref) => {
    const sourceIsNotPromise = typeof src === 'string' || !src;
    const [loading, setLoading] = useState(!sourceIsNotPromise);
    const [source, setSource] = useState<string | undefined>(
      sourceIsNotPromise ? (src as string | undefined) : undefined,
    );

    const getSource = useCallback(async (srcGetter: FuturableOrLazy<string | undefined>) => {
      setLoading(true);
      let fetchedSource = undefined;
      try {
        fetchedSource = await futureableOrLazyToFuturable(srcGetter);
      } catch {}
      setLoading(false);
      setSource(fetchedSource || undefined);
    }, []);

    useEffect(() => {
      if (sourceIsNotPromise) {
        setLoading(false);
        setSource((src as string | undefined) || undefined);
        return;
      }
      getSource(src);
    }, [getSource, sourceIsNotPromise, src]);

    const imageClass = classnames('ui__image', className);

    if (loading || pending) return <>{onRenderLoading?.()}</>;
    if (!source) return <>{onRenderFallback?.()}</>;
    return <img {...imgProps} alt={alt} src={source} className={imageClass} ref={ref} />;
  },
);
