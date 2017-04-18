import React from 'react'
import {shallow} from 'enzyme'
import FormField from './FormField'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
      it('should render editable field', () => {
        const formField = {
          displayType: 'EDITABLE',
          useLabel: 'YES'
        }
        const wrapper = shallow(<FormField formDefinitionField={formField}/>)
        expect(wrapper.find('label')).to.not.have.className('sr-only')
        expect(wrapper.find('div').at(1)).to.have.className('col-sm-8')
      })

      it('should hide label for editable field with hidden label', () => {
        const formField = {
          displayType: 'EDITABLE',
          useLabel: 'HIDE'
        }
        const wrapper = shallow(<
          FormField formDefinitionField={formField}/>)
        expect(wrapper.find('label')).to.have.className('sr-only')
        expect(wrapper.find('div').at(1)).to.have.className('col-sm-12')
      })

      it('should not render hidden field', () => {
        const formField = {
          displayType: 'HIDDEN'
        }
        const wrapper = shallow(<FormField formDefinitionField={formField}/>)
        expect(wrapper.type()).to.be.null
      })
    })
  })
})
