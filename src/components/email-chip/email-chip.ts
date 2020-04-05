import './email-chip.sass'
import template from './email-chip.html'
import { createElement, q } from 'utils/dom'
import { EmailEvent, CustomEventListener } from 'types'

export class EmailChip {
  private _element: HTMLElement

  get element(): HTMLElement {
    return this._element
  }

  get styleClasses(): string[] {
    const classes = ['email-chip']

    return this.isValid ? classes : classes.concat('email-chip--invalid')
  }

  constructor (
    private readonly emailAddress: string,
    private readonly isValid: boolean,
    private readonly eventTarget = new EventTarget()
  ) {
    this.createElement()
  }

  private addRemoveListener(): void {
    q(this._element, '.email-chip__remove-button').addEventListener('click', () => {
      this._element.remove()
      this.eventTarget.dispatchEvent(new Event(EmailEvent.REMOVE))
    })
  }

  private createElement (): void {
    this._element = createElement('div', template, this.styleClasses)

    q(this._element, '.email-chip__address').innerHTML = this.emailAddress
    this.addRemoveListener()
  }

  /**
   * Adds listener to available events:
   * - REMOVE
   * @see EmailEvent
   */
  addEventListener(eventName: EmailEvent, listener: CustomEventListener<void>): void {
    this.eventTarget.addEventListener(eventName, listener)
  }
}
