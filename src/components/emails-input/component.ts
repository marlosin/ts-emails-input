import './main.sass'
import { createElement } from 'utils/dom'
import { InputEmail } from 'components/input-email';
import { EmailChip } from 'components/email-chip';

export class EmailsInput {

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private renderInput(emailsInput: HTMLElement): void {
    const input = new InputEmail(emailsInput)

    input.subscribe(({ email, isValid }) => {
      const { element: chipElement } = new EmailChip(email, isValid)
      emailsInput.insertBefore(chipElement, emailsInput.lastChild)
    })
  }

  private render (): void {
    const emailsInput = createElement('div', ['emails-input'])

    this.renderInput(emailsInput)

    this.container.appendChild(emailsInput)
  }
}
