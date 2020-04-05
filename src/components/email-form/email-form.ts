import './email-form.sass'
import template from './email-form.html'
import { createElement, createRandomEmail, q } from 'utils'
import { EmailsInput } from 'components/emails-input'

export class EmailForm {
  private element: HTMLFormElement
  private body: HTMLElement
  private emailsInputs: ReadonlyArray<EmailsInput>

  constructor (
    private readonly container: HTMLElement,
    private readonly inputs = 1,
  ) {
    this.render()
  }

  private renderEmailsInputs(): void {
    this.emailsInputs = Array.from(
      { length: this.inputs },
      () => new EmailsInput(this.body),
    )
  }

  private addEventListeners(): void {
    q(this.element, '.email-form__add-button')
      .addEventListener('click', () => {
        this.emailsInputs.forEach(emailsInput => emailsInput.addEmail(createRandomEmail()))
      })
  }

  private render (): void {
    this.element = createElement('forn', template, ['email-form']) as HTMLFormElement
    this.body = q(this.element, '.email-form-header__body')

    this.renderEmailsInputs()
    this.addEventListeners()

    this.container.prepend(this.element)
  }
}
