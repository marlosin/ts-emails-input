/**
 * E-mail events
 */
export enum EmailEvent {
  ADD_EMAIL = 'ADD_EMAIL',
  REMOVE_EMAIL = 'REMOVE_EMAIL',
}

/**
 * Listener type for generic type of event
 */
export type CustomEventListener<T> = (evt: CustomEvent<T>) => void
