export function mockElement(): jest.Mocked<HTMLElement> {
  return {
    parentNode: {
      removeChild: jest.fn(),
    } as unknown as ParentNode,
  } as jest.Mocked<HTMLElement>
}

export function mockRemoveButton(): jest.Mocked<HTMLButtonElement> {
  return {
    removeEventListener: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as jest.Mocked<HTMLButtonElement>
}
