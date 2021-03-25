import React from 'react'
import {mount} from 'enzyme'

import ResizeObserver from '../../../../../../../__mocks__/ResizeObserver'
import ModalDisplay from './ModalDisplay'
import ModalContent from './ModalContent'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('modalComponents', () => {
        describe('ModalDisplay', () => {
          test('should render all modals', () => {
            window.ResizeObserver = ResizeObserver
            const modals = [
              {id: 1, title: 'Test1', message: 'Message1', component: () => <div>Test1</div>},
              {id: 2, title: 'Test2', message: 'Message2', component: () => <div>Test2</div>}
            ]

            const wrapper = mount(
              <ModalDisplay
                modals={modals}
                close={() => {}}
              />
            )

            expect(wrapper.find(ModalContent)).to.have.length(modals.length)
          })
        })
      })
    })
  })
})
