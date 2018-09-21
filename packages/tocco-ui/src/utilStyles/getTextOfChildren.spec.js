import React from 'react'
import {shallow} from 'enzyme'

import {getTextOfChildren} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('getTextOfChildren', () => {
      test('should get text from all nodes and respect spaces', () => {
        const wrapper = shallow(<i>A<i><i>B</i>C<i>D</i></i>E <i><i>F  </i>G   <i>H    </i></i>I</i>)
        expect(getTextOfChildren(wrapper.props().children)).to.equal('ABCDE F  G   H    I')
      })
    })
  })
})
