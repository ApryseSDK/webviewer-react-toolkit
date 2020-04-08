import classnames from 'classnames';
import React, { forwardRef, ImgHTMLAttributes, ReactNode, useCallback, useEffect, useState } from 'react';
import { FuturableOrLazy, futureableOrLazyToFuturable } from '../../data';
import { Remove } from '../../utils';

export interface ImageProps extends Remove<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * The image source can be a `Futurable` or `LazyFuturable`, or undefined. If
   * undefined or if a promise will display as loading.
   */
  src?: FuturableOrLazy<string>;
  /**
   * Render out an element to be shown while src is loading.
   */
  onRenderLoading?(): ReactNode;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, onRenderLoading, alt, className, ...imgProps }, ref) => {
    const [source, setSource] = useState<string | undefined>(typeof src === 'string' ? src : undefined);

    const getSource = useCallback(async (srcGetter: FuturableOrLazy<string>) => {
      const fetchedSource = await futureableOrLazyToFuturable(srcGetter);
      setSource(fetchedSource);
    }, []);

    useEffect(() => {
      if (typeof src === 'string' || src === undefined) return setSource(src);
      getSource(src);
    }, [src, getSource]);

    const imageClass = classnames('ui__image', className);

    return source ? (
      <img {...imgProps} alt={alt} src={source} className={imageClass} ref={ref} />
    ) : (
      <>{onRenderLoading?.()}</>
    );
  },
);
