const createRandomText = (): string => Math.random().toString(36).substring(2, 10)

const providers = ['google', 'yahoo', 'hotmail']
const createRandomProvider = (): string => providers[Math.floor(Math.random() * providers.length)] + '.com';

/**
 * Creates a random e-mail address
 */
export const createRandomEmail = (): string => createRandomText() + '@' + createRandomProvider()

/**
 * Validates an e-mail address
 */
export function isEmailValid (email: string): boolean {
  return /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/i.test(email)
}
