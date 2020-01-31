import addons from '@storybook/addons';
import { NAVIGATE_URL } from '@storybook/core-events';
import { useEffect } from 'react';

export function Redirect() {
  useEffect(() => {
    const poll = window.setInterval(() => {
      const search = window.location.search;
      const url = window.location != window.parent.location ? document.referrer : document.location.href;
      const pathMatch = url.match(/[^/]+(\/[^/]+\/)(?=\?)/);
      const path = pathMatch ? pathMatch[1] : '/';
      if (search.includes('viewMode=docs')) {
        return window.clearInterval(poll);
      }
      if (search.includes('viewMode=story')) {
        const match = search.match(/\?id=([\w-]+)/);
        if (!match) return window.clearInterval(poll);
        addons.getChannel().emit(NAVIGATE_URL, `${path}?path=/docs/${match[1]}`);
      }
    }, 100);
    return () => {
      window.clearInterval(poll);
    };
  }, []);
  return null;
}
