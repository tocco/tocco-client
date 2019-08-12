import React from 'react'
import {mount} from 'enzyme'

import MultiSelectFormatter from './MultiSelectFormatter'
import SingleSelectFormatter from './SingleSelectFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('MultiSelectFormatter ', () => {
        test('should format value', () => {
          const value = [{key: '3', display: 'Selected'}, {key: '4', display: 'Selected2'}]
          const wrapper = mount(<MultiSelectFormatter
            value={value}/>)
          expect(wrapper.text()).to.equal('Selected, Selected2')
          expect(wrapper.find(SingleSelectFormatter)).to.have.length(2)
        })

        test('should render Links if factory provided', () => {
          const value = [{key: '3', display: 'Selected'}, {key: '4', display: 'Selected2'}]
          const wrapper = mount(<MultiSelectFormatter
            value={value}
            options={{linkFactory: (key, children) => <a>{children}</a>}}
          />)
          expect(wrapper.find('a')).to.have.length(2)
        })
      })
    })
  })
})
