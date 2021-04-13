import React from 'react'
import {mount} from 'enzyme'

import IntegerEdit from './IntegerEdit'

const EMPTY_FUNC = () => {
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('IntegerEdit ', () => {
        test('should render IntegerEdit', () => {
          const wrapper = mount(
            <IntegerEdit value={12345} options={{}} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return number string in en', () => {
          const result = '123456'
          const wrapper = mount(
            <IntegerEdit
              value={123456}
              onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.html()).to.contains(result)
        })

        test('should call onChange handler', done => {
          const changeHandler = value => {
            expect(value).to.eql(100)
            done()
          }

          const wrapper = mount(
            <IntegerEdit
              value={1}
              onChange={changeHandler}
              options={{maxValue: 100}}
            />
          )

          wrapper.find('input').simulate('change', {target: {value: '100', focus: () => {}}})
        })

        test('should call onChange handler with value null', done => {
          const changeHandler = value => {
            expect(value).to.be.null
            done()
          }

          const wrapper = mount(
            <IntegerEdit
              value={1}
              onChange={changeHandler}
              options={{maxValue: 100}}
            />
          )

          wrapper.find('input').simulate('change', {target: {value: '', focus: () => {}}})
        })

        test('should not call onChange it number is too high', done => {
          const spy = sinon.spy()
          const wrapper = mount(
            <IntegerEdit
              value={2}
              options={{maxValue: 10}}
              onChange={spy}/>
          )

          wrapper.find('input').simulate('change', {target: {value: '15', focus: () => {}}})
          expect(wrapper.html()).to.contains('2')

          setTimeout(() => {
            expect(spy).to.not.have.been.called
            done()
          }, 800)
        })

        test('should not call onChange it number is too low', done => {
          const spy = sinon.spy()
          const wrapper = mount(
            <IntegerEdit
              value={10}
              options={{minValue: 10}}
              onChange={spy}/>
          )

          wrapper.find('input').simulate('change', {target: {value: '9', focus: () => {}}})
          expect(wrapper.html()).to.contains('10')

          setTimeout(() => {
            expect(spy).to.not.have.been.called
            done()
          }, 800)
        })
      })
    })
  })
})
