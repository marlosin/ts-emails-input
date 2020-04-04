import './main.sass'
import { createElement } from 'utils/dom'
import { InputEmail } from 'components/input-email';

export class EmailsInput {

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private render (): void {
    const emailsInput = createElement('div', ['emails-input'])

    // TODO: assign to local property
    new InputEmail(emailsInput)

    this.container.appendChild(emailsInput)
  }
}
