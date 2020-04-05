const createRandomText = (): string => Math.random().toString(36).substring(2, 10)

const providers = ['google', 'yahoo', 'hotmail']
const createRandomProvider = (): string => providers[Math.floor(Math.random() * providers.length)] + '.com';

export const createRandomEmail = (): string => createRandomText() + '@' + createRandomProvider()

const input = document.createElement('input');
input.type = 'email'
input.required = true

export function isEmailValid(email: string): boolean {
  input.value = email

  return input.checkValidity()
}
