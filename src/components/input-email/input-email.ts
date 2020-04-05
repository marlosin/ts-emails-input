import './input-email.sass'
import template from './input-email.html'
import { createElement, q } from 'utils/dom'
import { EmailAddEvent } from './types'
import { KEY_ENTER, KEY_COMMA, KEY_RETURN } from 'keycode-js'

type AddEmailSubscriber = (evt: CustomEvent<EmailAddEvent>) => void

/**
 * Trims and make an email lowercase
 */
export const formatEmail = (email: string): string => email.trim().toLowerCase()

/**
 * Event name
 */
export enum InputEmailEvent {
  ADD_EMAIL = 'ADD_EMAIL',
}

export class InputEmail {
  /**
   * The native input
   */
  private _input: HTMLInputElement

  get input (): HTMLInputElement {
    return this._input
  }

  set input (input: HTMLInputElement) {
    this._input = input
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

  get isValueNotEmpty(): boolean {
    return Boolean(formatEmail(this.input.value).replace(/,/g, ''))
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
    private readonly eventTarget = new EventTarget(),
  ) {
    this.render()
  }

  private emit(event: EmailAddEvent): void {
    this.eventTarget.dispatchEvent(new CustomEvent(InputEmailEvent.ADD_EMAIL, { detail: event }))
  }

  private emitAdd(emails?: string[]): void {
    if (!emails) {
      this.emit({
        email: formatEmail(this.input.value),
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
    setTimeout(() => this.input.value = '')
  }

  public onInput(event: KeyboardEvent): void {
    this.isValid = this.input.checkValidity()

    if (this.addKeys.includes(event.keyCode) && this.isValueNotEmpty) {
      this.emitAdd()
    }
  }

  public onBlur(): void {
    this.isValid = this.input.checkValidity()

    if (this.isValueNotEmpty) {
      this.emitAdd()
    }
  }

  public onPaste(event: ClipboardEvent): void {
    const pasteText = event.clipboardData.getData('text')
    const emails = pasteText.split(',')
      .map(formatEmail)
      .filter(Boolean)

    this.emitAdd(emails)
  }

  /**
   * Subscribes to e-mail add events
   */
  public addEventListener(eventName: InputEmailEvent, subscriber: AddEmailSubscriber): void {
    this.eventTarget.addEventListener(eventName, subscriber)
  }

  private addListeners(): void {
    this.input.addEventListener('keydown', (e: KeyboardEvent) => this.onInput(e))
    this.input.addEventListener('blur', () => this.onBlur())
    this.input.addEventListener('paste', (e: ClipboardEvent) => this.onPaste(e))
  }

  private render (): void {
    const inputContainer = createElement('div', template, ['input-email-container'])
    this.input = q(inputContainer, 'input')

    this.addListeners()

    this.container.appendChild(inputContainer)
  }
}
