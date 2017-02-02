import React from 'react'
import LabeledField from './LabeledField'
import {mount, shallow} from 'enzyme'
import {EditableValue} from 'tocco-ui'

const EMPTY_FUNC = () => {
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('LabeledField', () => {
      it('should show edit field with label ', () => {
        const wrapper = shallow(
          <LabeledField
            input={{
              value: 'test',
              name: 'firstname',
              onChange: EMPTY_FUNC
            }}
            label="First Name"
            type="string"
            meta={{touched: false}}
          />)

        expect(wrapper.find('.control-label')).to.have.text('First Name:')
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })

      it('should show errors ', () => {
        const wrapper = mount(
          <LabeledField
            input={{
              value: 'test',
              name: 'firstname',
              onChange: EMPTY_FUNC
            }}
            label="First Name"
            type="string"

            meta={{
              touched: true,
              error: {length: 'Min length 10', st: 'error2'}
            }}
          />)

        expect(wrapper.find('.error-list')).to.have.length(1)
        expect(wrapper.find('li')).to.have.length(2)
      })
    })
  })
})

