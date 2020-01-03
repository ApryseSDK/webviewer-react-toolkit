/**
 * Returns an object describing whether the object is visible. It will detect if
 * the item is cut off by either the top or bottom of the window, or by the
 * container passed in.
 * @param element The element to detect scroll position of.
 * @param container The scroll container which could be cutting off the item.
 */
export function isScrolledIntoView(element: Element | null | undefined, container: Element | null | undefined) {
  if (!element || !container) return { isVisible: true, isAbove: false, isBelow: false };

  const elem = element.getBoundingClientRect();
  const cont = container.getBoundingClientRect();
  const elemTop = elem.top;
  const elemBottom = elem.bottom;

  // Can be cut off by container, or by window if container extends outside.
  const contTop = Math.max(cont.top, 0);
  const contBottom = Math.min(cont.bottom, window.innerHeight);

  // Only completely visible elements return true:
  const isAbove = elemTop < contTop;
  const isBelow = elemBottom > contBottom;
  const isVisible = !isAbove && !isBelow;
  return { isVisible, isAbove, isBelow };
}

/**
 * Get a sibling in the DOM based on an index diff.
 * @param element The element to find the sibling of.
 * @param indexDiff The index diff of the sibling to find (ex: 1 returns next sibling).
 */
export function getSibling(element: HTMLElement | null | undefined, indexDiff: number) {
  if (!element || !element.parentElement) return undefined;

  const siblings = Array.from(element.parentElement.children);
  const nodeIndex = siblings.indexOf(element);

  // Get the item occupying the previous index location.
  const sibling = siblings[nodeIndex + indexDiff];

  return sibling;
}
