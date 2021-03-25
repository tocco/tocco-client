import React from 'react'
import {shallow} from 'enzyme'

import Notification from './Notification'
import ModalDisplay from '../../modules/modal/ModalDisplay'
import BlockingDisplay from '../../modules/blocking/BlockingDisplay'
import ToasterDisplay from '../../modules/toaster/ToasterDisplay'

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('Notifier', () => {
        test('should render toastr and modal ', () => {
          const wrapper = shallow(
            <Notification
            />
          )

          expect(wrapper.find(ModalDisplay)).to.have.length(1)
          expect(wrapper.find(ToasterDisplay)).to.have.length(1)
          expect(wrapper.find(BlockingDisplay)).to.have.length(1)
        })
      })
    })
  })
})
