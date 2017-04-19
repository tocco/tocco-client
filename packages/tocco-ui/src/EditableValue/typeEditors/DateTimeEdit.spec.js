import React from 'react'
import {shallow} from 'enzyme'

import DateTimeEdit from './DateTimeEdit'
import DateAbstract from './DateAbstract'

const EMPTY_FUNC = () => {
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateTimeEdit ', () => {
        it('should call onChange with date from date picker', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateTimeEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', ['2017-04-13T13:28:59.414Z'])

          expect(onChange).to.be.calledWith('2017-04-13T13:28:59.414Z')
        })

        it('should throw an exception if multiple dates received from date picker', () => {
          const wrapper = shallow(
            <DateTimeEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          expect(() => dateAbstract.simulate('change', ['2017-04-13T13:28:59.414Z', '2017-04-14T22:31:59.743Z']))
            .to.throw('Expected at most one item in array: 2017-04-13T13:28:59.414Z, 2017-04-14T22:31:59.743Z')
        })
      })
    })
  })
})
