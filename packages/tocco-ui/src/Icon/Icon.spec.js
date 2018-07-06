import React from 'react'
import Icon from './Icon'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Icon', function() {
    it('should have 2 defaultProps', () => {
      const wrapper = shallow(<Icon icon="fa-bar"/>)
      expect(wrapper.props().position).to.equal('sole')
      expect(Icon.defaultProps.animation).to.equal('none')
    })

    it('should pass 4 props to StyledIcon', () => {
      const wrapper = shallow(
        <Icon
          animation="none"
          dense={true}
          icon="fa-bar"
          position="between"
        />
      )
      const props = wrapper.props()
      const {
        animation,
        className,
        dense,
        position
      } = props
      expect(Object.keys(props)).to.have.lengthOf(5)
      expect(animation).to.equal('none')
      expect(className).to.equal('fa fa-bar icon')
      expect(dense).to.be.true
      expect(position).to.equal('between')
    })

    it('should set classnames for Glyphicon', () => {
      const wrapper = shallow(<Icon icon="glyphicon-plus"/>)
      expect(wrapper.props().className).to.equal('glyphicon glyphicon-plus icon')
    })

    it('should set classnames for Font Awesome', () => {
      const wrapper = shallow(<Icon icon="fa-bar"/>)
      expect(wrapper.props().className).to.equal('fa fa-bar icon')
    })

    it('should animate Font Awesome', () => {
      const wrapper = shallow(<Icon animation="spin" icon="fa-bar"/>)
      expect(wrapper.props().className).to.equal('fa fa-spin fa-bar icon')
    })

    it('should render unicode and set classname', () => {
      const wrapper = shallow(<Icon unicode={'\u2022'}/>)
      expect(wrapper.dive().text()).to.equal('•')
      expect(wrapper.props().className).to.equal('fa')
    })
  })
})
