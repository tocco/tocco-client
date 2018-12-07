import React from 'react'
import {shallow} from 'enzyme'

import SelectionController from './SelectionController'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    const baseProps = {
      clearSelection: EMPTY_FUNC,
      selection: [],
      setSelectionMode: EMPTY_FUNC
    }

    describe('Selection', () => {
      it('should render a dropdown', () => {
        const wrapper = shallow(<SelectionController {...baseProps}/>)
        expect(wrapper.find('select')).to.have.length(1)
      })

      it('should show amount of selected records', () => {
        const selection = new Array(99)
        const wrapper = shallow(<SelectionController {...baseProps} selection={selection}/>)
        expect(wrapper.text()).to.contain('99')
      })
    })
  })
})
