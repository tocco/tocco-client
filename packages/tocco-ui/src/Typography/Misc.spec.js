import {mount, shallow} from 'enzyme'
import React from 'react'

import {
  B,
  Code,
  Del,
  Em,
  Figcaption,
  I,
  Ins,
  Kbd,
  Mark,
  P,
  Pre,
  Q,
  S,
  Small,
  Strong,
  Sub,
  Sup,
  Time,
  U,
  Var
} from './Misc'

describe('tocco-ui', function() {
  describe('Typography', function() {
    describe('Misc', function() {
      describe('B', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <B>Lorem Ipsum</B>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <B>Lorem ipsum</B>
          )
          expect(wrapper.find('b').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('b').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <B breakWords={false}>Lorem ipsum</B>
          )
          expect(wrapper.find('b').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('b').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Code', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Code>Lorem Ipsum</Code>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Code>Lorem ipsum</Code>
          )
          expect(wrapper.find('code').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('code').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Code breakWords={false}>Lorem ipsum</Code>
          )
          expect(wrapper.find('code').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('code').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Del', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Del>Lorem Ipsum</Del>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Del>Lorem ipsum</Del>
          )
          expect(wrapper.find('del').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('del').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Del breakWords={false}>Lorem ipsum</Del>
          )
          expect(wrapper.find('del').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('del').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Em', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Em>Lorem Ipsum</Em>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Em>Lorem ipsum</Em>
          )
          expect(wrapper.find('em').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('em').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Em breakWords={false}>Lorem ipsum</Em>
          )
          expect(wrapper.find('em').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('em').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Figcaption', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Figcaption>Lorem Ipsum</Figcaption>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Figcaption>Lorem ipsum</Figcaption>
          )
          expect(wrapper.find('figcaption').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('figcaption').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Figcaption breakWords={false}>Lorem ipsum</Figcaption>
          )
          expect(wrapper.find('figcaption').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('figcaption').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('I', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <I>Lorem Ipsum</I>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <I>Lorem ipsum</I>
          )
          expect(wrapper.find('i').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('i').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <I breakWords={false}>Lorem ipsum</I>
          )
          expect(wrapper.find('i').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('i').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Ins', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Ins>Lorem Ipsum</Ins>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Ins>Lorem ipsum</Ins>
          )
          expect(wrapper.find('ins').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('ins').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Ins breakWords={false}>Lorem ipsum</Ins>
          )
          expect(wrapper.find('ins').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('ins').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Kbd', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Kbd>Lorem Ipsum</Kbd>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Kbd>Lorem ipsum</Kbd>
          )
          expect(wrapper.find('kbd').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('kbd').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Kbd breakWords={false}>Lorem ipsum</Kbd>
          )
          expect(wrapper.find('kbd').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('kbd').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Mark', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Mark>Lorem Ipsum</Mark>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Mark>Lorem ipsum</Mark>
          )
          expect(wrapper.find('mark').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('mark').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Mark breakWords={false}>Lorem ipsum</Mark>
          )
          expect(wrapper.find('mark').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('mark').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('P', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <P>Lorem Ipsum</P>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <P>Lorem ipsum</P>
          )
          expect(wrapper.find('p').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('p').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <P breakWords={false}>Lorem ipsum</P>
          )
          expect(wrapper.find('p').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('p').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Pre', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Pre>Lorem Ipsum</Pre>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Pre>Lorem ipsum</Pre>
          )
          expect(wrapper.find('pre').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('pre').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Pre breakWords={false}>Lorem ipsum</Pre>
          )
          expect(wrapper.find('pre').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('pre').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Q', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Q>Lorem Ipsum</Q>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Q>Lorem ipsum</Q>
          )
          expect(wrapper.find('q').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('q').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Q breakWords={false}>Lorem ipsum</Q>
          )
          expect(wrapper.find('q').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('q').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('S', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <S>Lorem Ipsum</S>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <S>Lorem ipsum</S>
          )
          expect(wrapper.find('s').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('s').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <S breakWords={false}>Lorem ipsum</S>
          )
          expect(wrapper.find('s').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('s').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Small', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Small>Lorem Ipsum</Small>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Small>Lorem ipsum</Small>
          )
          expect(wrapper.find('small').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('small').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Small breakWords={false}>Lorem ipsum</Small>
          )
          expect(wrapper.find('small').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('small').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Strong', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Strong>Lorem Ipsum</Strong>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Strong>Lorem ipsum</Strong>
          )
          expect(wrapper.find('strong').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('strong').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Strong breakWords={false}>Lorem ipsum</Strong>
          )
          expect(wrapper.find('strong').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('strong').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Sub', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Sub>Lorem Ipsum</Sub>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Sub>Lorem ipsum</Sub>
          )
          expect(wrapper.find('sub').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('sub').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Sub breakWords={false}>Lorem ipsum</Sub>
          )
          expect(wrapper.find('sub').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('sub').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Sup', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Sup>Lorem Ipsum</Sup>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Sup>Lorem ipsum</Sup>
          )
          expect(wrapper.find('sup').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('sup').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Sup breakWords={false}>Lorem ipsum</Sup>
          )
          expect(wrapper.find('sup').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('sup').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Time', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Time dateTime="23:59:59">23:59:59</Time>
          )
          const {breakWords, dateTime} = wrapper.props()
          expect(breakWords).to.be.false
          expect(dateTime).not.to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Time
              breakWords={true}
              dateTime="23:59:59"
            >23:59:59</Time>
          )
          expect(wrapper.find('time').text()).to.equal('23:59:59')
          expect(wrapper.find('time').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Time
              dateTime="23:59:59"
              title="23:59:59"
            >23:59:59</Time>
          )
          expect(wrapper.find('time').text()).to.equal('23:59:59')
          expect(wrapper.find('time').prop('title')).to.equal('23:59:59')
        })
      })

      describe('U', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <U>Lorem Ipsum</U>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <U>Lorem ipsum</U>
          )
          expect(wrapper.find('u').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('u').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <U breakWords={false}>Lorem ipsum</U>
          )
          expect(wrapper.find('u').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('u').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Var', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Var>Lorem Ipsum</Var>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Var>Lorem ipsum</Var>
          )
          expect(wrapper.find('var').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('var').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Var breakWords={false}>Lorem ipsum</Var>
          )
          expect(wrapper.find('var').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('var').prop('title')).to.equal('Lorem ipsum')
        })
      })
    })
  })
})
