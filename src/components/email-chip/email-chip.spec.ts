import { createEventTarget, createRandomEmail, CustomEventTarget, q } from 'utils'
import { EmailChip } from './email-chip'
import { EmailChipStyles, ROOT_INVALID_CLASS_NAME } from './email-chip.consts'
import { mockElement } from './email-chip.mocks'
import { EmailEvent } from 'types'

interface ComponentStub {
  component: EmailChip
  eventTarget: CustomEventTarget
  getElement: <T extends Element>(_: string) => T
}

describe('EmailChip', () => {
  function createComponent({
    emailAddress = createRandomEmail(),
    isValid = true,
    eventTarget = createEventTarget(),
  } = {}): ComponentStub {
    const component = new EmailChip(emailAddress, isValid, eventTarget)

    return {
      component,
      eventTarget,
      getElement: <T extends Element>(className: string): T => q(component.element, className),
    }
  }

  it('should render e-mail address', () => {
    const emailAddress = createRandomEmail()
    const { getElement } = createComponent({ emailAddress })

    expect(getElement(EmailChipStyles.emailLabel).innerHTML).toEqual(emailAddress)
  })

  describe('Invalid e-mail', () => {
    it('should NOT contain class when is valid', () => {
      const { component } = createComponent()

      expect(component.element.classList).not.toContain(ROOT_INVALID_CLASS_NAME)
    })

    it('should contain class when is NOT valid', () => {
      const { component } = createComponent({ isValid: false })

      expect(component.element.classList).toContain(ROOT_INVALID_CLASS_NAME)
    })
  })

  describe('Remove button', () => {
    it('should render proper title', () => {
      const { component } = createComponent()

      expect(component.removeButton.title).toEqual('Remove e-mail')
    })

    describe('On click', () => {
      it('should remove element', () => {
        const { component } = createComponent()

        jest.spyOn(component, 'element', 'get').mockReturnValue(mockElement())

        component.removeButton.dispatchEvent(new Event('click'))

        expect(component.element.parentNode.removeChild).toHaveBeenCalledWith(component.element)
      })

      it(`should remove button's click listener`, () => {
        const { component } = createComponent()

        jest.spyOn(component, 'element', 'get').mockReturnValue(mockElement())
        jest.spyOn(component.removeButton, 'removeEventListener')

        component.removeButton.dispatchEvent(new Event('click'))

        expect(component.removeButton.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function))
      })

      it(`should dispatch remove event`, () => {
        const { component, eventTarget } = createComponent()

        jest.spyOn(component, 'element', 'get').mockReturnValue(mockElement())
        jest.spyOn(eventTarget, 'dispatchEvent')

        component.removeButton.dispatchEvent(new Event('click'))

        expect(eventTarget.dispatchEvent).toHaveBeenCalledWith(component.removeEvent)
      })
    })
  })

  describe('Public API', () => {
    it(`should dispatch remove button click on destroy`, () => {
      const { component } = createComponent()

      // eslint-disable-next-line
      jest.spyOn(component.removeButton, 'dispatchEvent').mockImplementation((_: Event) => true)

      component.destroy()

      expect(component.removeButton.dispatchEvent).toHaveBeenCalledWith(new Event('click'))
    })

    it(`should add event listener to event target`, () => {
      const { component, eventTarget } = createComponent()

      jest.spyOn(eventTarget, 'addEventListener')

      const event = EmailEvent.REMOVE
      // eslint-disable-next-line
      const listener = (): void => {}

      component.addEventListener(event, listener)

      expect(eventTarget.addEventListener).toHaveBeenCalledWith(event, listener)
    })
  })

})
