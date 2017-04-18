import React from 'react'
import {shallow} from 'enzyme'

import DateRangeEdit from './DateRangeEdit'
import DateAbstract from './DateAbstract'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateRangeEdit ', () => {
        it('should render DateAbstract without value', () => {
          const wrapper = shallow(
            <DateRangeEdit value={null}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
          expect(dateAbstract.prop('value')).to.be.null
        })

        it('should render DateAbstract without value (only `from` date)', () => {
          const wrapper = shallow(
            <DateRangeEdit value={{from: '2017-04-13'}}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
          expect(dateAbstract.prop('value')).to.be.null
        })

        it('should render DateAbstract without value (only `to` date)', () => {
          const wrapper = shallow(
            <DateRangeEdit value={{to: '2017-04-13'}}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
          expect(dateAbstract.prop('value')).to.be.null
        })

        it('should render DateAbstract with value', () => {
          const wrapper = shallow(
            <DateRangeEdit value={{
              from: '2017-04-13',
              to: '2017-04-16'
            }}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
          expect(dateAbstract.prop('value')).to.be.eql(['2017-04-13', '2017-04-16'])
        })

        it('should call onChange with null if null received from DateAbstract', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateRangeEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', null)

          expect(onChange).to.be.calledWith(null)
        })

        it('should call onChange with null if empty array received from DateAbstract', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateRangeEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', [])

          expect(onChange).to.be.calledWith(null)
        })

        it('should call onChange with null if only 1 date selected', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateRangeEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', ['2017-04-13'])

          expect(onChange).to.be.calledWith(null)
        })

        it('should call onChange with from and to date if 2 dates selected', () => {
          const onChange = sinon.spy()

          const wrapper = shallow(
            <DateRangeEdit onChange={onChange}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)

          dateAbstract.simulate('change', ['2017-04-13', '2017-04-16'])

          expect(onChange).to.be.calledWith({
            from: '2017-04-13',
            to: '2017-04-16'
          })
        })
      })
    })
  })
})
