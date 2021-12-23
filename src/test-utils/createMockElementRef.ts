import { createComponentInstance } from '@muban/muban/lib/Component';
import { refElement } from '@muban/test-mock';
import { nanoid } from 'nanoid';

/**
 * Creates a `ref` for an `Element` that can be used to pass to hooks
 *
 * @returns { ref, target }
 * ref: the created ref
 * target: the html element for that ref
 */
export function createMockElementRef() {
  const uniqueId = nanoid();
  const target = document.createElement('div');
  target.dataset.ref = uniqueId;
  const instance = createComponentInstance({}, target, { name: uniqueId, setup: () => [] });
  const ref = refElement(uniqueId).createRef(instance);
  return { ref, target };
}
