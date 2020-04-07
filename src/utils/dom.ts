import { CustomEventTarget } from 'utils'

/**
 * Creates an element and adds optional classes
 */
export function createElement (
  tagName: string,
  templateOrClasses: string | string[],
  classes?: string[],
): HTMLElement {
  const el = document.createElement(tagName)
  const addClasses = (classList: string[]): void => classList.forEach(c => el.classList.add(c))

  if (typeof templateOrClasses === 'string') {
    el.innerHTML = templateOrClasses
  } else {
    addClasses(templateOrClasses)
  }

  if (classes) {
    addClasses(classes)
  }

  return el
}

/**
 * An alias for querySelector with optional context node
 */
export const q = <E extends Element>(context: string | HTMLElement, selector?: string): E | null => {
  if (typeof context === 'string') {
    return document.querySelector(context)
  }
  return context.querySelector(selector)
}


/**
 * Creates an element to be used as browser's EventTarget
 */
export function createEventTarget<T = unknown>(): CustomEventTarget<T> {
  return new CustomEventTarget<T>()
}
