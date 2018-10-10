import React from 'react'
import {shallow} from 'enzyme'

import Select from '../../Select'
import RemoteSelect from './RemoteSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('RemoteSelect ', () => {
        test('should render a Select component', () => {
          const options = {
            noResultsText: 'NO_RESULTS_TEXT'
          }

          const wrapper = shallow(
            <RemoteSelect
              options={options}
              value={{key: 2, display: 'Two'}}
              onChange={() => {}}
            />)

          expect(wrapper.find(Select)).to.have.length(1)
          expect(wrapper.find(Select).prop('noResultsText')).to.be.eql('NO_RESULTS_TEXT')
        })
      })
    })
  })
})
