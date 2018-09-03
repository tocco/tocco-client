import React from 'react'
import {shallow} from 'enzyme'

import TetheredSelectWrap from './TetherSelectWrap'
import RemoteSelect from './RemoteSelect'
import Button from '../../Button/Button'

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

          expect(wrapper.find(TetheredSelectWrap)).to.have.length(1)
          expect(wrapper.find(TetheredSelectWrap).prop('clearValueText')).to.be.eql('CLEAR_VALUE_TEXT')
          expect(wrapper.find(TetheredSelectWrap).prop('searchPromptText')).to.be.eql('SEARCH_PROMPT_TEXT')
          expect(wrapper.find(TetheredSelectWrap).prop('noResultsText')).to.be.eql('NO_RESULTS_TEXT')
        })

        it('should call onChange ', () => {
          const newValue = {key: 1, display: 'label1'}
          const spy = sinon.spy()
          const wrapper = shallow(<RemoteSelect onChange={spy} options={{}}/>)
          wrapper.find(TetheredSelectWrap).simulate('change', newValue)
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

          expect(wrapper.find(TetheredSelectWrap)).to.have.length(1)
          expect(wrapper.find(TetheredSelectWrap).prop('options')).to.be.eql(option)
        })

        it('should show advancedSearch Button if callback is defined', () => {
          const advancedSearchSpy = sinon.spy()
          const wrapper = shallow(
            <RemoteSelect
              options={{openAdvancedSearch: advancedSearchSpy}}
              value={null}
              onChange={() => {}}
            />)

          expect(wrapper.find(Button)).to.have.length(1)
          wrapper.find(Button).simulate('click')
          expect(advancedSearchSpy).to.be.called
        })
      })
    })
  })
})
