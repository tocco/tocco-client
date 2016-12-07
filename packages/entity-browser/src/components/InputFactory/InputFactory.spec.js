import React from 'react'
import InputFactory from './InputFactory'
import {TextFieldInputHandler} from './TypeHandler'

import {shallow} from 'enzyme'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      describe('InputFactory', () => {
        it('should not render any not available Input', () => {
          const fieldDefinition = {
            type: 'NOT_AVAILABLE_IN_MAP',
            displayType: 'EDITABLE'
          }

          const wrapper = shallow(<InputFactory fieldDefinition={fieldDefinition} setSearchTerm={() => {}}/>)
          expect(wrapper.find('input')).to.have.length(0)
        })

        it('should not render any hidden Input', () => {
          const fieldDefinition = {
            name: 'ch.tocco.nice2.model.form.components.simple.TextField',
            displayType: 'HIDDEN'
          }

          const wrapper = shallow(<InputFactory fieldDefinition={fieldDefinition} setSearchTerm={() => {}}/>)
          expect(wrapper.find('input')).to.have.length(0)
        })

        it('should render an Input', () => {
          const fieldDefinition = {
            type: 'ch.tocco.nice2.model.form.components.simple.TextField',
            displayType: 'EDITABLE'
          }

          const wrapper = shallow(<InputFactory fieldDefinition={fieldDefinition} setSearchTerm={() => {}}/>)
          expect(wrapper.find(TextFieldInputHandler)).to.have.length(1)
        })
      })
    })
  })
})
