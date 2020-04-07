import './email-chip.sass'
import template from './email-chip.html'
import { createElement, q, createEventTarget, CustomEventData } from 'utils'
import { EmailEvent, CustomEventListener } from 'types'

export class EmailChip {
  private _element: HTMLElement
  get element(): HTMLElement { return this._element }

  private _removeButton: HTMLElement

  private _removeButtonListener: () => void

  get styleClasses(): string[] {
    const classes = ['email-chip']

    return this.isValid ? classes : classes.concat('email-chip--invalid')
  }

  constructor (
    private readonly emailAddress: string,
    readonly isValid: boolean,
    private readonly eventTarget = createEventTarget()
  ) {
    this.createElement()
  }

  private addListeners(): void {
    this._removeButtonListener = (): void => {
      this._removeButton.removeEventListener('click', this._removeButtonListener)
      this._element.parentNode.removeChild(this._element)
      this._element = null
      this.eventTarget.dispatchEvent(new CustomEventData(EmailEvent.REMOVE))
    }

    this._removeButton.addEventListener('click', this._removeButtonListener)
  }

  private createElement (): void {
    this._element = createElement('div', template, this.styleClasses)
    this._removeButton = q(this._element, '.email-chip__remove-button')

    q(this._element, '.email-chip__address').innerHTML = this.emailAddress
    this.addListeners()
  }

  /**
   * Adds listener to available events:
   * - REMOVE
   * @see EmailEvent
   */
  addEventListener(eventName: EmailEvent, listener: CustomEventListener<void>): void {
    this.eventTarget.addEventListener(eventName, listener)
  }

  destroy(): void {
    this._removeButton.dispatchEvent(new Event('click'))
  }
}
