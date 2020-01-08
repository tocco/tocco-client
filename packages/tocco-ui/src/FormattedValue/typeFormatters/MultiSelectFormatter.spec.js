import React from 'react'
import {mount} from 'enzyme'

import MultiSelectFormatter, {MultiSeparator} from './MultiSelectFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('MultiSelectFormatter ', () => {
        test('should format value', () => {
          const value = [{key: '3', display: 'Selected'}, {key: '4', display: 'Selected2'}]
          const wrapper = mount(<MultiSelectFormatter
            value={value} breakWords={true}/>)
          expect(wrapper.text()).to.equal('Selected, Selected2')
          expect(wrapper.find(MultiSeparator)).to.have.length(1)
        })

        test('should render Links if factory provided', () => {
          const value = [{key: '3', display: 'Selected'}, {key: '4', display: 'Selected2'}]
          const wrapper = mount(<MultiSelectFormatter
            value={value}
            breakWords={true}
            options={{linkFactory: (key, children) => <a>{children}</a>}}
          />)
          expect(wrapper.find('a')).to.have.length(2)
        })
      })
    })
  })
})
