import React from 'react'
import Notifier from './Notifier'
import {shallow} from 'enzyme'
import ReduxToastr from 'react-redux-toastr'
import {defaultToastrOptions} from '../notifier'
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

        it('should use toastr options', () => {
          const toastrOptions = {position: 'top-left'}
          const wrapper = shallow(<Notifier toastrOptions={toastrOptions}/>)
          expect(wrapper.instance().props.toastrOptions).to.equal(toastrOptions)
        })

        it('should use toastr default options if not set', () => {
          const wrapper = shallow(<Notifier/>)
          expect(wrapper.instance().props.toastrOptions).to.equal(defaultToastrOptions)
        })
      })
    })
  })
})
