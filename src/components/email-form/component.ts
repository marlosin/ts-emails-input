import './main.sass'
import template from './template.html'
import { createElement } from 'utils/dom'
import { EmailsInput } from 'components/emails-input'

export class EmailForm {

  constructor (
    private readonly container: HTMLElement,
    private readonly inputs = 1,
  ) {
    this.render()
  }

  private render (): void {
    const form = createElement('forn', template, ['email-form'])

    for (let i = 0; i++ < this.inputs;) {
      new EmailsInput(form)
    }

    this.container.prepend(form)
  }
}
