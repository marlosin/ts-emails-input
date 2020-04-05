import './main.sass'
import template from './template.html'
import { createElement, q } from 'utils/dom'
import { EmailAddEvent } from './types'
import { KEY_ENTER, KEY_COMMA, KEY_RETURN } from 'keycode-js'

type AddEmailSubscriber = (_: EmailAddEvent) => void

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
   * The listeners to the add event
   */
  private listeners: AddEmailSubscriber[] = []

  /**
   * Whether the input is valid
   */
  private isValid: boolean;

  /**
   * The keys that triggers onAdd event
   */
  readonly addKeys = [
    KEY_ENTER,
    KEY_RETURN,
    KEY_COMMA,
  ]

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private emit(event: EmailAddEvent): void {
    this.listeners.forEach(listener => listener(event))
  }

  private emitAdd(emails?: string[]): void {
    if (!emails) {
      this.emit({
        email: this.input.value,
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
    this.input.value = ''
  }

  public onInput(event: KeyboardEvent): void {
    this.isValid = this.input.checkValidity()

    if (this.addKeys.includes(event.keyCode)) {
      this.emitAdd()
    }
  }

  public onPaste(event: ClipboardEvent): void {
    const pasteText = event.clipboardData.getData('text')
    const emails = pasteText.split(',').map(t => t.trim())

    this.emitAdd(emails)
  }

  /**
   * Subscribes to e-mail add events
   */
  public subscribe(subscriber: AddEmailSubscriber): void {
    this.listeners.push(subscriber)
  }

  private render (): void {
    const inputContainer = createElement('div', template, ['input-email-container'])
    this.input = q(inputContainer, 'input')

    this.input.addEventListener('keydown', (e: KeyboardEvent) => this.onInput(e))
    this.input.addEventListener('blur', () => this.emitAdd())
    this.input.addEventListener('paste', (e: ClipboardEvent) => this.onPaste(e))

    this.container.appendChild(inputContainer)
  }
}
