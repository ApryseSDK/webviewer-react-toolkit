import classnames from 'classnames';
import React, { forwardRef, ImgHTMLAttributes, ReactNode, useCallback, useEffect, useState } from 'react';
import { FuturableOrLazy, futureableOrLazyToFuturable } from '../../data';
import { Remove } from '../../types';

export interface ImageProps extends Remove<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * The image source can be a `Futurable` or `LazyFuturable`, or undefined. If
   * undefined or if a promise will display as loading.
   */
  src?: FuturableOrLazy<string>;
  /**
   * If given, will override the loading based on whether src is fetched.
   */
  loading?: boolean;
  /**
   * Specific classes for all of the internal elements. If you just wish to give
   * a class to image, you can use `className`.
   */
  classes?: { wrapper?: string; image?: string; overlay?: string };
  /**
   * Render out an element to be shown while src is loading.
   */
  onRenderLoading?: () => ReactNode;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, loading, classes, onRenderLoading, alt, className, ...imgProps }, ref) => {
    const [source, setSource] = useState<string | undefined>(typeof src === 'string' ? src : undefined);

    const getSource = useCallback(async (srcGetter: FuturableOrLazy<string>) => {
      const fetchedSource = await futureableOrLazyToFuturable(srcGetter);
      setSource(fetchedSource);
    }, []);

    useEffect(() => {
      if (typeof src === 'string' || src === undefined) return setSource(src);
      getSource(src);
    }, [src, getSource]);

    const wrapperClass = classnames('ui__base ui__image__wrapper', classes?.wrapper);

    const imageClass = classnames('ui__image', { 'ui__image--loading': loading ?? !source }, classes?.image, className);

    const overlayClass = classnames(
      'ui__image__overlay',
      {
        'ui__image__overlay--loading': loading || !source,
        'ui__image__overlay--hide': !onRenderLoading,
      },
      classes?.overlay,
    );

    return (
      <div className={wrapperClass}>
        <img {...imgProps} alt={alt} src={source} className={imageClass} ref={ref} />
        <div className={overlayClass}>{onRenderLoading?.()}</div>
      </div>
    );
  },
);
