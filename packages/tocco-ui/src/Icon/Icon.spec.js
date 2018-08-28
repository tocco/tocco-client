import React from 'react'
import {shallow, mount} from 'enzyme'

import Icon from './Icon'

describe('tocco-ui', function() {
  describe('Icon', function() {
    it('should have 1 defaultProps', () => {
      const wrapper = shallow(<Icon />)
      expect(wrapper.props().position).to.equal('sole')
    })

    it('should render an icon', done => {
      let wrapper = null
      const loaded = () => {
        wrapper.update()
        expect(wrapper.find('svg')).to.have.length(1)
        done()
      }

      wrapper = mount(<Icon icon="user" onLoaded={loaded}/>)
    })
  })
})
