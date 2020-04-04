/**
 * Creates an element and adds optional classes
 */
export const createElement = (
  tagName: string,
  template: string,
  ...classes: string[]
): HTMLElement => {
  const el = document.createElement(tagName)
  el.innerHTML = template
  el.classList.add(...classes)

  return el
}

/**
 * Creates a text node
 */
export const createTextNode = (text: string): Text => document.createTextNode(text)

/**
 * An alias for querySelector with optional context node
 */
export const q = <E extends Element>(context: string | ParentNode, selector: string): E | null => {
  if (typeof context === 'string') {
    return document.querySelector(context)
  }
  return context.querySelector(selector)
}
