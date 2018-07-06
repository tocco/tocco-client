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

    it('should pass 8 props to StyledIcon', () => {
      const wrapper = shallow(
        <Icon
          animation="none"
          dense={true}
          icon="fa-bar"
          onClickFunction={() => alert('on click')}
          onMouseEnterFunction={() => alert('on mouse enter')}
          onMouseLeaveFunction={() => alert('on mouse leave')}
          onMouseDownFunction={() => alert('on mouse down')}
          position="between"
        />
      )
      const props = wrapper.props()
      const {
        animation,
        className,
        dense,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
        position
      } = props
      expect(Object.keys(props)).to.have.lengthOf(9)
      expect(animation).to.equal('none')
      expect(className).to.equal('fa fa-bar icon')
      expect(dense).to.be.true
      expect(onClick).to.be.a('function')
      expect(onMouseEnter).to.be.a('function')
      expect(onMouseLeave).to.be.a('function')
      expect(onMouseDown).to.be.a('function')
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
