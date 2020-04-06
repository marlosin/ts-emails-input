/**
 * Creates an element and adds optional classes
 */
export const createElement = (
  tagName: string,
  templateOrClasses: string | string[],
  classes?: string[],
): HTMLElement => {
  const el = document.createElement(tagName)
  if (typeof templateOrClasses === 'string') {
    el.innerHTML = templateOrClasses
  } else {
    el.classList.add(...templateOrClasses)
  }

  if (classes) {
    el.classList.add(...classes)
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
export function createEventTarget(): EventTarget {
  return document.createElement('div') as EventTarget
}
