import './email-form.sass'
import template from './email-form.html'
import { createElement, createRandomEmail, q } from 'utils'
import { EmailsInput } from 'components/emails-input'

const sumValidEmails = (counter: number, emailsInput: EmailsInput): number => counter + emailsInput.getValidCount()

export class EmailForm {
  private element: HTMLFormElement
  private body: HTMLElement
  private emailsInputs: ReadonlyArray<EmailsInput>

  private get totalValidEmails(): number {
    return this.emailsInputs.reduce(sumValidEmails, 0)
  }

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

    this.emailsInputs.forEach(console.log)
  }

  private addEventListeners(): void {
    q(this.element, '.email-form__add-button')
      .addEventListener('click', () => {
        this.emailsInputs.forEach(emailsInput => emailsInput.addEmail(createRandomEmail()))
      })

    q(this.element, '.email-form__get-count-button')
      .addEventListener('click', () => {
        window.alert(`Total valid e-mails: ${this.totalValidEmails}`)
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
