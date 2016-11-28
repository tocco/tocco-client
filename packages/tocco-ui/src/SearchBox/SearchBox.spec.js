import React from 'react'
import SearchBox from './SearchBox'
import Button from '../Button'

import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('SearchBox', function() {
    const DEFAULT_DEBOUNCE = 200
    const SEARCH_STRING = 'My Search String'

    it('should render', () => {
      const wrapper = shallow(<SearchBox onSearch={() => {}}/>)
      expect(wrapper.find('.tocco-searchbox')).to.have.length(1)
      expect(wrapper.find(Button)).to.be.disabled()
    })

    it('should call search function on button click', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      const button = wrapper.find(Button)
      button.simulate('click')
      expect(button).to.not.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on button click before default debounce', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      const button = wrapper.find(Button)
      button.simulate('click')
      expect(button).to.not.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE - 10)
    })

    it('should not call search function on button click on empty input value', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      const button = wrapper.find(Button)
      button.simulate('click')
      expect(button).to.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on key `Enter`', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      wrapper.find('input').simulate('keyDown', {keyCode: 13})
      expect(wrapper.find(Button)).to.not.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on key `Enter` on empty input value', done => {
      const searchFunc = sinon.spy(() => {})
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)
      const input = wrapper.find('input')
      input.simulate('keyDown', {keyCode: 13})

      expect(wrapper.find(Button)).to.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on any other key than `enter`', done => {
      const func = sinon.spy(() => {})
      const wrapper = shallow(<SearchBox
        onSearch={func}
        minInputLength={10}
      />)

      const input = wrapper.find('input')
      input.simulate('keyDown', {keyCode: 40})
      expect(wrapper.find(Button)).to.be.disabled()
      setTimeout(() => {
        expect(func).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on button click after specified debounce', done => {
      const searchFunc = sinon.spy(() => {})
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        debounce={50}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      const button = wrapper.find(Button)
      button.simulate('click')
      expect(button).to.not.be.disabled()
      setTimeout(() => {
        expect(searchFunc).to.be.calledWith(SEARCH_STRING)
        done()
      }, 50)
    })

    it('should render the placeholder', () => {
      const placeholder = 'MyPlaceHolder'
      const wrapper = shallow(<SearchBox
        onSearch={() => {}}
        placeholder={placeholder}
      />)
      const searchBox = wrapper.find('.tocco-searchbox')

      expect(searchBox).to.have.length(1)
      expect(searchBox.find('input').prop('placeholder')).to.equal(placeholder)
    })
  })
})
