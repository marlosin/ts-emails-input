import './email-chip.sass'
import template from './email-chip.html'
import { createElement, q, createEventTarget, CustomEventData } from 'utils'
import { EmailEvent, CustomEventListener } from 'types'
import { ROOT_CLASS_NAME, ROOT_INVALID_CLASS_NAME, EmailChipStyles } from './email-chip.consts'

export class EmailChip {
  private _element: HTMLElement
  get element(): HTMLElement { return this._element }

  private _removeButton: HTMLButtonElement
  get removeButton(): HTMLButtonElement { return this._removeButton }

  private _removeButtonListener: () => void

  get styleClasses(): string[] {
    const classes = [ROOT_CLASS_NAME]

    return this.isValid ? classes : classes.concat(ROOT_INVALID_CLASS_NAME)
  }

  readonly removeEvent = new CustomEventData(EmailEvent.REMOVE)

  constructor (
    readonly emailAddress: string,
    readonly isValid: boolean,
    private readonly eventTarget = createEventTarget()
  ) {
    this.createElement()
  }

  private addListeners(): void {
    this._removeButtonListener = (): void => {
      this.removeButton.removeEventListener('click', this._removeButtonListener)
      this.element.parentNode.removeChild(this.element)
      this._element = null
      this.eventTarget.dispatchEvent(this.removeEvent)
    }

    this.removeButton.addEventListener('click', this._removeButtonListener)
  }

  private createElement (): void {
    this._element = createElement('div', template, this.styleClasses)
    this._removeButton = q(this._element, EmailChipStyles.removeButton)

    q(this._element, EmailChipStyles.emailLabel).innerHTML = this.emailAddress
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
    this.removeButton.dispatchEvent(new Event('click'))
  }
}
