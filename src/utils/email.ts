const createRandomText = (): string => Math.random().toString(36).substring(2, 10)

const providers = ['google', 'yahoo', 'hotmail']
const createRandomProvider = (): string => providers[Math.floor(Math.random() * providers.length)] + '.com';

/**
 * Creates a random e-mail address
 */
export const createRandomEmail = (): string => createRandomText() + '@' + createRandomProvider()

function getEmailInput(value: string): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'email'
  input.required = true
  input.value = value

  return input
}

/**
 * Validates an e-mail address
 */
export const isEmailValid = (email: string): boolean => getEmailInput(email).checkValidity()
