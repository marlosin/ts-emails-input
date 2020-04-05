import './emails-input.sass'
import { createElement } from 'utils/dom'
import { InputEmail } from 'components/input-email'
import { EmailChip } from 'components/email-chip'

export class EmailsInput {
  private element: HTMLElement
  private input: InputEmail

  private readonly emailMap = new Map<string, boolean>()

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private renderInput(): void {
    this.input = new InputEmail(this.element)

    this.input.subscribe(({ email, isValid }) => this.addEmail(email, isValid))
  }

  private render (): void {
    this.element = createElement('div', ['emails-input'])

    this.renderInput()

    this.container.appendChild(this.element)
  }

  public addEmail(email: string, isValid = true): void {
    if (this.emailMap.has(email)) { return } // do not add repeated e-mails

    this.emailMap.set(email, isValid)
    const { element: chipElement } = new EmailChip(email, isValid)
    this.element.insertBefore(chipElement, this.element.lastChild)
  }

  public getValidCount(): number {
    return [...this.emailMap.values()]
      .filter(Boolean)
      .length
  }
}
