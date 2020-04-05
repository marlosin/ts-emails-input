import './email-chip.sass'
import template from './email-chip.html'
import { createElement, q } from 'utils/dom'
import { EmailEvent, CustomEventListener } from 'types'

export class EmailChip {
  private _element: HTMLElement

  get element(): HTMLElement {
    return this._element
  }

  constructor (
    private readonly emailAddress: string,
    private readonly isValid: boolean,
    private readonly eventTarget = new EventTarget()
  ) {
    this.createElement()
  }

  public get styleClasses(): string[] {
    const classes = ['email-chip']

    return this.isValid ? classes : classes.concat('email-chip--invalid')
  }

  private addCloseListener(): void {
    q(this._element, '.email-chip__close-button').addEventListener('click', () => {
      this._element.remove()
      this.eventTarget.dispatchEvent(new Event(EmailEvent.REMOVE_EMAIL))
    })
  }

  private createElement (): void {
    this._element = createElement('div', template, this.styleClasses)

    q(this._element, '.email-chip__address').innerHTML = this.emailAddress
    this.addCloseListener()
  }

  /**
   * Adds listener to available events:
   * - EmailEvent.REMVOVE_EMAIL
   */
  public addEventListener(eventName: EmailEvent, listener: CustomEventListener<void>): void {
    this.eventTarget.addEventListener(eventName, listener)
  }
}
