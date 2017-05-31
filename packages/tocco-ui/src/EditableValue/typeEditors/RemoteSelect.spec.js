import React from 'react'
import {shallow} from 'enzyme'
import Select from 'react-select'

import RemoteSelect from './RemoteSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('RemoteSelect ', () => {
        it('should render a Async Select component', () => {
          const options = {
            clearValueText: 'CLEAR_VALUE_TEXT',
            searchPromptText: 'SEARCH_PROMPT_TEXT',
            noResultsText: 'NO_RESULTS_TEXT'
          }

          const wrapper = shallow(
            <RemoteSelect
              options={options}
              value={{key: 2, display: 'Two'}}
              onChange={() => {}}
            />)

          expect(wrapper.find(Select)).to.have.length(1)
          expect(wrapper.find(Select).prop('clearValueText')).to.be.eql('CLEAR_VALUE_TEXT')
          expect(wrapper.find(Select).prop('searchPromptText')).to.be.eql('SEARCH_PROMPT_TEXT')
          expect(wrapper.find(Select).prop('noResultsText')).to.be.eql('NO_RESULTS_TEXT')
        })

        it('should call onChange ', () => {
          const newValue = {key: 1, display: 'label1'}
          const spy = sinon.spy()
          const wrapper = shallow(<RemoteSelect onChange={spy} options={{}}/>)
          wrapper.find(Select).simulate('change', newValue)
          expect(spy).to.have.been.calledWith(newValue)
        })

        it('should add disabled option with specified text', () => {
          const text = 'More Options Available'

          const options = {
            options: [],
            moreOptionsAvailable: true,
            moreOptionsAvailableText: text
          }

          const option = [{
            display: text,
            disabled: true
          }]

          const wrapper = shallow(
            <RemoteSelect
              options={options}
            />)

          expect(wrapper.find(Select)).to.have.length(1)
          expect(wrapper.find(Select).prop('options')).to.be.eql(option)
        })
      })
    })
  })
})
