import './input-email.sass'
import template from './input-email.html'
import { createElement, q, createEventTarget } from 'utils/dom'
import { EmailAddEvent } from './types'
import { KEY_ENTER, KEY_COMMA, KEY_RETURN } from 'keycode-js'
import { EmailEvent, CustomEventListener } from 'types'

/**
 * Trims and make an email lowercase
 */
export const formatEmail = (email: string): string => email.trim().toLowerCase()

export class InputEmail {
  /**
   * The native input
   */
  private _nativeElement: HTMLInputElement

  get nativeElement (): HTMLInputElement {
    return this._nativeElement
  }

  set nativeElement (input: HTMLInputElement) {
    this._nativeElement = input
    this._inputClone = input.cloneNode() as HTMLInputElement
  }

  /**
   * The clone input, used for validation purposes
   */
  private _inputClone: HTMLInputElement

  /**
   * Whether the input is valid
   */
  private isValid: boolean;

  /**
   * Whether an email has any content, removing commas
   */
  get isValueNotEmpty(): boolean {
    return Boolean(formatEmail(this.nativeElement.value.replace(/,/g, '')))
  }

  /**
   * The keys that triggers onAdd event
   */
  readonly addKeys = [
    KEY_ENTER,
    KEY_RETURN,
    KEY_COMMA,
  ]

  constructor (
    private readonly container: HTMLElement,
    private readonly eventTarget = createEventTarget(),
  ) {
    this.render()
  }

  private emit(event: EmailAddEvent): void {
    this.eventTarget.dispatchEvent(new CustomEvent(EmailEvent.ADD, { detail: event }))
  }

  private emitAdd(emails?: string[]): void {
    if (!emails) {
      this.emit({
        email: formatEmail(this.nativeElement.value),
        isValid: this.isValid,
      })
    } else {
      emails.forEach(email => {
        this._inputClone.value = email
        this.emit({
          email,
          isValid: this._inputClone.checkValidity()
        })
      })
    }

    // reset value
    this.nativeElement.value = ''
  }

  private addListeners(): void {
    this.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => this.onInput(e))
    this.nativeElement.addEventListener('blur', () => this.onBlur())
    this.nativeElement.addEventListener('paste', (e: ClipboardEvent) => this.onPaste(e))
  }

  private render (): void {
    const inputContainer = createElement('div', template, ['input-email-container'])
    this.nativeElement = q(inputContainer, 'input')

    this.addListeners()

    this.container.appendChild(inputContainer)
  }

  onInput(event: KeyboardEvent): void {
    this.isValid = this.nativeElement.checkValidity()
    const hasAddKey = this.addKeys.indexOf(event.keyCode) !== -1

    if (hasAddKey && this.isValueNotEmpty) {
      this.emitAdd()
    }
  }

  onBlur(): void {
    this.isValid = this.nativeElement.checkValidity()

    if (this.isValueNotEmpty) {
      this.emitAdd()
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault()
    const pasteText = event.clipboardData.getData('text')
    const emails = pasteText.split(',')
      .map(formatEmail)
      .filter(Boolean)

    this.emitAdd(emails)
  }

  /**
   * Adds listener to available events:
   * - ADD
   * @see EmailEvent
   */
  addEventListener(eventName: EmailEvent, listener: CustomEventListener<EmailAddEvent>): void {
    this.eventTarget.addEventListener(eventName, listener)
  }
}
