import React from 'react'
import {{{pascalCase componentName}}} from './{{pascalCase componentName}}'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('{{kebabCase package}}', () => {
  describe('components', () => {
    describe('{{pascalCase componentName}}', () => {
      it('should render', () => {
        const wrapper = shallow(<{{pascalCase componentName}}/>)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
