import React from 'react'
import {mount} from 'enzyme'

import ModalContent from './ModalContent'

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('modules', () => {
      describe('modalComponents', () => {
        describe('ModalContent', () => {
          test('should render component with close property', () => {
            const closeSpy = sinon.spy()
            const id = Date.now()
            // eslint-disable-next-line react/prop-types
            const component = ({close}) => <div>TEST<button onClick={() => close()}>close</button></div>
            const close = closeSpy
            const wrapper = mount(
              <ModalContent
                id={id}
                component={component}
                close={close}
              />
            )
            expect(wrapper.find(component)).to.have.length(1)
            wrapper.find('button').simulate('click')
            setTimeout(() => {
              expect(closeSpy).to.have.property('callCount', 1)
            }, 300)
          })
        })
      })
    })
  })
})
