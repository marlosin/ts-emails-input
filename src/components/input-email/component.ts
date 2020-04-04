import './main.sass'
import template from './template.html'
import { createElement, q } from 'utils/dom'

export class InputEmail {
  private input: HTMLInputElement

  constructor (private readonly container: HTMLElement) {
    this.render()
  }

  private render (): void {
    const inputContainer = createElement('div', template, ['input-email-container'])
    this.input = q(inputContainer, 'input')

    this.input.addEventListener('input', () => {
      // TODO: add logic
    });

    this.input.addEventListener('paste', () => {
      // TODO: add logic
    });

    this.container.appendChild(inputContainer)
  }
}
