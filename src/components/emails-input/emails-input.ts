import './emails-input.sass'
import { createElement } from 'utils/dom'
import { InputEmail, EmailAddEvent } from 'components/input-email'
import { EmailChip } from 'components/email-chip'
import { EmailEvent } from 'types'

export class EmailsInput {
  private element: HTMLElement
  private input: InputEmail

  private readonly emailMap = new Map<string, boolean>()

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private renderInput(): void {
    this.input = new InputEmail(this.element)

    this.input.addEventListener(
      EmailEvent.ADD,
      ({ detail: { email, isValid } }: CustomEvent<EmailAddEvent>) => {
        this.addEmail(email, isValid)
      },
    )
  }

  private render (): void {
    this.element = createElement('div', ['emails-input'])

    this.renderInput()

    this.container.appendChild(this.element)
  }

  public addEmail(email: string, isValid = true): void {
    if (this.emailMap.has(email)) { return } // do not add repeated e-mails

    this.emailMap.set(email, isValid)

    const emailChip = new EmailChip(email, isValid)
    this.element.insertBefore(emailChip.element, this.element.lastChild)

    emailChip.addEventListener(EmailEvent.REMOVE, () => this.emailMap.delete(email))
  }

  /**
   * Gets the total count of valid e-mails
   */
  public getValidCount(): number {
    return [...this.emailMap.values()]
      .filter(Boolean)
      .length
  }
}
