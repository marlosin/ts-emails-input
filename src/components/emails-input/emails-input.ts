import './emails-input.sass'
import { createElement } from 'utils/dom'
import { InputEmail } from 'components/input-email'
import { EmailChip } from 'components/email-chip'

export class EmailsInput {
  private element: HTMLElement

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private renderInput(): void {
    const input = new InputEmail(this.element)

    input.subscribe(({ email, isValid }) => this.addEmail(email, isValid))
  }

  private render (): void {
    this.element = createElement('div', ['emails-input'])

    this.renderInput()

    this.container.appendChild(this.element)
  }

  public addEmail(email: string, isValid = true): void {
    const { element: chipElement } = new EmailChip(email, isValid)
    this.element.insertBefore(chipElement, this.element.lastChild)
  }
}
