import type {
  CollectionRef,
  ComponentFactory,
  ComponentRef,
  ComponentsRef,
  ElementRef,
  RefElementType,
} from '@muban/muban';

export type ElementOrComponentRef<T extends RefElementType = HTMLElement> =
  | Omit<ElementRef<T>, 'refreshRefs'>
  | Omit<ComponentRef<ComponentFactory>, 'refreshRefs'>;

export type ElementOrComponentCollection<T extends RefElementType = HTMLElement> =
  | Omit<CollectionRef<T>, 'refreshRefs'>
  | Omit<ComponentsRef<ComponentFactory>, 'refreshRefs'>;

export type DomElementOrRef<T extends RefElementType = HTMLElement> = ElementOrComponentRef<T> | T;

export type DomElementsOrRefCollection<T extends RefElementType = HTMLElement> =
  | Array<T>
  | ElementOrComponentCollection<T>;
