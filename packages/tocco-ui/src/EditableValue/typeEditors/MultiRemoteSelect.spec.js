import React from 'react'
import {shallow} from 'enzyme'
import Select from 'react-select'

import MultiRemoteSelect from './MultiRemoteSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MultiRemoteSelect ', () => {
        it('should render a Async Select component', () => {
          const options = {
            clearAllText: 'CLEAR_ALL_TEXT',
            searchPromptText: 'SEARCH_PROMPT_TEXT',
            noResultsText: 'NO_RESULTS_TEXT'
          }

          const wrapper = shallow(
            <MultiRemoteSelect
              options={options}
              value={[{key: 2, display: 'Two'}]}
              onChange={() => {}}
            />)

          expect(wrapper.find(Select.Async)).to.have.length(1)
          expect(wrapper.find(Select.Async).prop('clearAllText')).to.be.eql('CLEAR_ALL_TEXT')
          expect(wrapper.find(Select.Async).prop('searchPromptText')).to.be.eql('SEARCH_PROMPT_TEXT')
          expect(wrapper.find(Select.Async).prop('noResultsText')).to.be.eql('NO_RESULTS_TEXT')
        })

        it('should call onChange ', () => {
          const newValue = {key: 1, display: 'label1'}
          const spy = sinon.spy()
          const wrapper = shallow(<MultiRemoteSelect onChange={spy} options={{}}/>)
          wrapper.find(Select.Async).simulate('change', newValue)
          expect(spy).to.have.been.calledWith(newValue)
        })
      })
    })
  })
})
