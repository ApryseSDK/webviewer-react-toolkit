import classnames from 'classnames';
import React, { forwardRef, ImgHTMLAttributes, useCallback, useEffect, useState, ReactNode } from 'react';
import { Omit } from '../../utils/typeUtils';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * The image source can be either a string, or a function that returns a
   * promise to get a string. If not given, will show as loading.
   */
  src?: string | (() => Promise<string>);
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
  /**
   * Timeout to throttle getting the image. Only applies if `src` is a function.
   * @default 500;
   */
  throttleTimeout?: number;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, loading, classes, onRenderLoading, throttleTimeout = 500, alt, className, ...imgProps }, ref) => {
    const [source, setSource] = useState<string | undefined>(typeof src !== 'function' ? src : undefined);

    const getSource = useCallback(async (srcGetter: () => Promise<string>) => {
      const fetchedSource = await srcGetter();
      setSource(fetchedSource);
    }, []);

    useEffect(() => {
      if (typeof src !== 'function') return setSource(src);
      const timeout = setTimeout(() => getSource(src), throttleTimeout);
      return () => clearTimeout(timeout);
    }, [src, getSource, throttleTimeout]);

    const wrapperClass = classnames('ui__base ui__image__wrapper', classes?.wrapper);

    const imageClass = classnames(
      'ui__image',
      { ['ui__image--loading']: loading ?? !source },
      classes?.image,
      className,
    );

    const overlayClass = classnames(
      'ui__image__overlay',
      {
        ['ui__image__overlay--loading']: loading ?? !source,
        ['ui__image__overlay--hide']: !onRenderLoading,
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
