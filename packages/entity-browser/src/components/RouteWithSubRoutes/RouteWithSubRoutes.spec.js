import React from 'react'
import {RouteWithSubRoutes} from './RouteWithSubRoutes'
import {shallow} from 'enzyme'
import {Route} from 'react-router'

describe('entity-browser', () => {
  describe('components', () => {
    describe('RouteWithSubRoutes', () => {
      it('should render a component', () => {
        const route = {
          path: '/',
          component: () => <div>test</div>
        }
        const wrapper = shallow(
          <RouteWithSubRoutes
            {...route}
          />
        )

        expect(wrapper.find(Route)).to.have.length(1)
        const render = wrapper.find(Route).first().props().render
        expect(render).to.be.a('function')
        const res = render()
        const innerWrapper = shallow(res)
        expect(innerWrapper.find('div').first().text()).to.eql('test')
      })

      it('should render a render', () => {
        const route = {
          path: '/',
          render: props => <div>test2</div>
        }
        const wrapper = shallow(
          <RouteWithSubRoutes
            {...route}
          />
        )

        expect(wrapper.find(Route)).to.have.length(1)
        const render = wrapper.find(Route).first().props().render
        expect(render).to.be.a('function')
        const res = render()
        const innerWrapper = shallow(res)
        expect(innerWrapper.find('div').first().text()).to.eql('test2')
      })
    })
  })
})
