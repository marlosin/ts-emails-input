/**
 * E-mail events
 */
export enum EmailEvent {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

/**
 * Listener type for generic type of event
 */
export type CustomEventListener<T> = (evt: CustomEvent<T>) => void
