/**
 * E-mail events
 * Use real event names for IE support
 */
export enum EmailEvent {
  ADD = 'click',
  REMOVE = 'focus',
}

/**
 * Listener type for generic type of event
 */
export type CustomEventListener<T> = (evt: CustomEvent<T>) => void
