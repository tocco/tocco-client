import React from 'react'
import Notifier from './Notifier'
import {shallow} from 'enzyme'
import ReduxToastr from 'react-redux-toastr'
import ModalDisplayContainer from '../modules/modalComponents/ModalDisplayContainer'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('Notifier', () => {
        it('should render toastr and modal ', () => {
          const title = 'Title'
          const message = 'message'
          const wrapper = shallow(
            <Notifier
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(ReduxToastr)).to.have.length(1)
          expect(wrapper.find(ModalDisplayContainer)).to.have.length(1)
        })
      })
    })
  })
})
