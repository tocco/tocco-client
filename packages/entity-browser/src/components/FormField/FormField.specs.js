import React from 'react'
import {shallow} from 'enzyme'
import FormField from './FormField'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
      it('should render', () => {
        const formField = {
          displayType: 'HIDDEN'
        }
        const wrapper = shallow(<FormField formDefinitionField={formField}/>)
        expect(wrapper.type()).to.be.null
      })
    })
  })
})
