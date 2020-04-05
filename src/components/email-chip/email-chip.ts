import './email-chip.sass'
import template from './email-chip.html'
import { createElement, q } from 'utils/dom'

export class EmailChip {
  private _element: HTMLElement

  get element(): HTMLElement {
    return this._element
  }

  constructor (
    private readonly emailAddress: string,
    private readonly isValid: boolean,
  ) {
    this.createElement()
  }

  public get styleClasses(): string[] {
    const classes = ['email-chip']

    return this.isValid ? classes : classes.concat('email-chip--invalid')
  }

  private createElement (): void {
    this._element = createElement('div', template, this.styleClasses)

    q(this._element, '.email-chip__adrress').innerHTML = this.emailAddress
  }
}
