import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import Range from './'
import EditableValue from '../EditableValue'
import Ball from '../Ball'

describe('tocco-ui', () => {
  describe('Range', () => {
    describe('<Range>', () => {
      test('should render', () => {
        const wrapper = intlEnzyme.mountWithIntl(<Range type="number" options={{}} value={1}
          events={{onChange: () => {}}}/>)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })

      test('should render two inputs for range values', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <Range
            type="number"
            options={{}}
            value={{isRangeValue: true, from: 1}}
            events={{onChange: () => {}}}
          />
        )
        expect(wrapper.find(EditableValue)).to.have.length(2)
      })

      test('should change to range value on expander click', () => {
        const onChangeSpy = sinon.spy()
        const wrapper = intlEnzyme.mountWithIntl(<Range type="number" options={{}} value={1}
          events={{onChange: onChangeSpy}}/>)
        wrapper.find(Ball).simulate('click')
        expect(onChangeSpy).to.have.been.calledWith({isRangeValue: true, from: 1, to: 1})
      })

      test('should change to single value on expander click', () => {
        const onChangeSpy = sinon.spy()
        const wrapper = intlEnzyme.mountWithIntl(
          <Range
            type="number"
            options={{}}
            value={{isRangeValue: true, from: null, to: 1}}
            events={{onChange: onChangeSpy}}
          />
        )
        wrapper.find(Ball).simulate('click')
        expect(onChangeSpy).to.have.been.calledWith(1)
      })
    })
  })
})
