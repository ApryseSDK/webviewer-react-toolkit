import { ObjectWithId } from './constantUtils';

/**
 * Separates the ids from the main list and returns separated and remaining.
 * @param allItems All of the items, from which you will separate any matching ids.
 * @param separateIds IDs to separate into separate array.
 */
export function separateItemsById<I extends ObjectWithId>(allItems: I[], separateIds: string[]): [I[], I[]] {
  const separated: I[] = [];
  const remaining: I[] = [];

  allItems.forEach(item => {
    if (!separateIds.includes(item.id)) {
      // Keep all unselected files in the files array.
      remaining.push(item);
    } else {
      // Add selected files to the dragging array.
      separated.push(item);
    }
  });

  return [separated, remaining];
}

/**
 * Separates the ids from the main list, but also re-inserts the target back
 * into the remaining items and returns it if it exists. It will only search for
 * a target in the separated array.
 * @param allItems All of the items, from which you will separate any matching ids.
 * @param separateIds IDs to separate into separate array.
 * @param targetId The ID of the target item to re-insert back and return.
 */
export function separateItemsWithTarget<I extends ObjectWithId>(
  allItems: I[],
  separateIds: string[],
  targetId: string,
): [I[], I[], I | undefined] {
  const [separated, remaining] = separateItemsById(allItems, separateIds);

  const target = separated.find(item => item.id === targetId);

  // If target is found, re-insert it into remaining at original index.
  if (target) {
    const targetIndex = allItems.indexOf(target);
    remaining.splice(targetIndex, 0, target);
  }

  return [separated, remaining, target];
}

export function moveMultiFromIndexToIndex<I extends ObjectWithId>(
  prev: I[],
  moveIds: string[],
  fromIndex: number,
  toIndex: number,
): I[] {
  const targetId = prev[fromIndex]?.id;

  if (targetId === undefined || !moveIds.includes(targetId)) return prev;

  const [separated, remaining] = separateItemsById(prev, moveIds);

  const targetIndex = separated.findIndex(item => item.id === targetId);

  // We place the separated so that target lines up with index.
  const insertionIndex = toIndex - targetIndex;

  if (insertionIndex > remaining.length) return prev;
  if (insertionIndex < 0) return prev;

  return [...remaining.slice(0, insertionIndex), ...separated, ...remaining.slice(insertionIndex)];
}
