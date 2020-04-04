import './main.sass'
import template from './template.html'
import { createElement, q } from 'utils/dom'
import { EmailsInput } from 'components/emails-input'

export class EmailForm {
  private body: HTMLElement

  constructor (
    private readonly container: HTMLElement,
    private readonly inputs = 1,
  ) {
    this.render()
  }

  private render (): void {
    const form = createElement('forn', template, ['email-form'])
    this.body = q(form, '.email-form-header__body')

    for (let i = 0; i++ < this.inputs;) {
      new EmailsInput(this.body)
    }

    this.container.prepend(form)
  }
}
