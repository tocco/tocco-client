import React from 'react'
import {shallow} from 'enzyme'

import DateEdit from './DateEdit'
import DateAbstract from './DateAbstract'

const EMPTY_FUNC = () => {
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateEdit ', () => {
        it('should call onChange with date from date picker', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', ['2017-04-13'])

          expect(onChange).to.be.calledWith('2017-04-13')
        })

        it('should throw an exception if multiple dates received from date picker', () => {
          const wrapper = shallow(
            <DateEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          expect(() => dateAbstract.simulate('change', ['2017-04-13', '2017-04-14']))
            .to.throw('Expected at most one item in array: 2017-04-13, 2017-04-14')
        })
      })
    })
  })
})
