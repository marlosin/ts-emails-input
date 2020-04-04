import './main.sass'
import template from './template.html'
import { createElement } from 'utils/dom'

export class EmailsInput {

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private render (): void {
    const emailsInput = createElement('div', template, 'emails-input')

    this.container.appendChild(emailsInput)
  }
}
