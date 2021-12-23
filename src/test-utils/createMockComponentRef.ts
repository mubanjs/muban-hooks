import { createComponentInstance } from '@muban/muban/lib/Component';
import { defineComponent, refComponent } from '@muban/test-mock';
import { nanoid } from 'nanoid';

/**
 * Creates a `ref` for a `Component` that can be used to pass to hooks
 *
 * @returns { ref, target }
 * ref: the created ref
 * target: the html element for that ref
 */
export function createMockComponentRef() {
  const uniqueParentId = nanoid();
  const parent = document.createElement('div');
  parent.dataset.component = uniqueParentId;
  const instance = createComponentInstance({}, parent, { name: uniqueParentId, setup: () => [] });

  const uniqueChildId = nanoid();
  const TestComponent = defineComponent({
    name: uniqueChildId,
    setup() {
      return [];
    },
  });
  const target = document.createElement('div');
  target.dataset.component = uniqueChildId;
  parent.appendChild(target);
  const ref = refComponent(TestComponent).createRef(instance);

  return { ref, target };
}
