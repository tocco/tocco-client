import React from 'react'
import SearchForm from './SearchForm'
import {InputFactory} from './../InputFactory'

import {shallow} from 'enzyme'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      describe('SearchForm', () => {
        it('should render', () => {
          const wrapper = shallow(<SearchForm formDefinition={[]} setSearchTerm={() => {}}/>)
          expect(wrapper.find('.search-form')).to.have.length(1)
          expect(wrapper.find('form')).to.have.length(1)
        })

        it('should render an input', () => {
          const formDefinition = [{
            name: 'field1',
            label: 'Label',
            displayType: 'DisplayType',
            type: 'Type'
          }]

          const wrapper = shallow(<SearchForm
            formDefinition={formDefinition}
            setSearchTerm={() => {}}
          />)

          expect(wrapper.find('form')).to.have.length(1)
          expect(wrapper.find(InputFactory)).to.have.length(1)
        })

        it('should render multiple inputs', () => {
          const formDefinition = [{
            name: 'field1',
            label: 'Label',
            displayType: 'DisplayType',
            type: 'Type'
          }, {
            name: 'field2',
            label: 'Label',
            displayType: 'DisplayType',
            type: 'Type'
          }]

          const wrapper = shallow(<SearchForm
            formDefinition={formDefinition}
            setSearchTerm={() => {}}
          />)

          expect(wrapper.find('form')).to.have.length(1)
          expect(wrapper.find(InputFactory)).to.have.length(formDefinition.length)
        })
      })
    })
  })
})
