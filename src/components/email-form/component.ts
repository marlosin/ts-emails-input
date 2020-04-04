import './main.sass'
import template from './template.html'
import { createElement } from 'utils/dom'

export class EmailForm {
  private readonly template = template

  constructor (container: HTMLElement) {
    this.render(container)
  }

  private render (container: HTMLElement) {
    const panel = createElement('forn', 'email-form')
    panel.innerHTML = this.template

    container.prepend(panel)
  }
}
