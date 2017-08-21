import React from 'react'
import {shallow} from 'enzyme'

import DateEdit from './DateEdit'
import DateAbstract from './DateAbstract'
import {getExpectedDate} from '../specUtils'

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

          dateAbstract.simulate('change', ['2017-04-12T22:00:00.000Z'])

          const expectedDate = getExpectedDate('2017-04-12', '2017-04-13', -120)
          expect(onChange).to.be.calledWith(expectedDate)
        })

        it('should throw an exception if multiple dates received from date picker', () => {
          const wrapper = shallow(
            <DateEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          expect(() => dateAbstract.simulate('change', ['2017-04-12T22:00:00.000Z', '2017-04-13T22:00:00.000Z']))
            .to.throw('Expected at most one item in array: 2017-04-12T22:00:00.000Z, 2017-04-13T22:00:00.000Z')
        })
      })
    })
  })
})
