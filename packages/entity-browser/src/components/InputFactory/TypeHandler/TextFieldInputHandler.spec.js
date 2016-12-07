import React from 'react'
import TextFieldInputHandler from './TextFieldInputHandler'
import * as ToccoUI from 'tocco-ui'

import {shallow} from 'enzyme'

const EMPTY_FUNCTION = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      describe('InputFactory', () => {
        describe('TextFieldInputHandler', () => {
          it('should not render any SearchBox component', () => {
            const fieldDefinition = {
              name: 'not_txtFulltext',
              label: 'Label',
              type: 'Type',
              displayType: 'EDITABLE'
            }

            const wrapper = shallow(<TextFieldInputHandler
              fieldDefinition={fieldDefinition}
              setSearchTerm={EMPTY_FUNCTION}
            />)

            expect(wrapper.find(ToccoUI.SearchBox)).to.have.length(0)
          })

          it('it should render a SearchBox component', () => {
            const placeholder = 'Placeholder'
            const fieldDefinition = {
              name: 'txtFulltext',
              label: placeholder,
              type: 'Type',
              displayType: 'EDITABLE'
            }

            const wrapper = shallow(<TextFieldInputHandler
              fieldDefinition={fieldDefinition}
              setSearchTerm={EMPTY_FUNCTION}
            />)

            const searchBox = wrapper.find(ToccoUI.SearchBox)
            expect(searchBox).to.have.length(1)
            expect(searchBox.props().placeholder).to.eql(placeholder)
          })

          it('should call setSearchTerm', () => {
            const setSearchTerm = sinon.spy()
            const fieldDefinition = {
              name: 'txtFulltext',
              label: 'label'
            }

            const wrapper = shallow(<TextFieldInputHandler
              fieldDefinition={fieldDefinition}
              setSearchTerm={setSearchTerm}
            />)

            const searchBox = wrapper.find(ToccoUI.SearchBox)
            expect(searchBox).to.have.length(1)
            searchBox.simulate('search')
            expect(setSearchTerm).to.have.been.calledOnce
          })
        })
      })
    })
  })
})
