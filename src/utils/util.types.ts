import type {
  CollectionRef,
  ComponentRef,
  ComponentsRef,
  ElementRef,
} from '@muban/muban/lib/refs/refDefinitions.types';
import type { BindProps } from '@muban/muban/lib/bindings/bindings.types';
import type { ComponentFactory } from '@muban/muban/lib/Component.types';

export type ElementOrComponentRef<T extends HTMLElement = HTMLElement> =
  | Omit<ElementRef<T, BindProps>, 'refreshRefs'>
  | Omit<ComponentRef<ComponentFactory>, 'refreshRefs'>;

export type ElementOrComponentCollection<T extends HTMLElement = HTMLElement> =
  | Omit<CollectionRef<T, BindProps>, 'refreshRefs'>
  | Omit<ComponentsRef<ComponentFactory>, 'refreshRefs'>;

export type DomElementOrRef<T extends HTMLElement = HTMLElement> = ElementOrComponentRef<T> | T;

export type DomElementsOrRefCollection<T extends HTMLElement = HTMLElement> =
  | Array<HTMLElement>
  | ElementOrComponentCollection<T>;
