import { EmailEvent, CustomEventListener } from 'types'

export * from './dom'
export * from './email'

export class CustomEventTarget<T> {
  readonly listeners: { [name: string]: Array<CustomEventListener<T>> } = {}

  addEventListener(eventName: EmailEvent, listener: CustomEventListener<T>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }

    this.listeners[eventName].push(listener)
  }

  dispatchEvent(event: CustomEventData<T>): void {
    this.listeners[event.name]?.forEach(listener => listener(event.data))
  }
}

export class CustomEventData<T = unknown> {
  constructor(
    readonly name: EmailEvent,
    readonly data?: T,
  ) {}
}
