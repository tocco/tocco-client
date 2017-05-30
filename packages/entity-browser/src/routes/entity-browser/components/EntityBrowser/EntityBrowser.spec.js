import React from 'react'
import {shallow} from 'enzyme'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import EntityBrowser from './EntityBrowser'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      it('should map routes', () => {
        const wrapper = shallow(<EntityBrowser routes={[{id: 'route1'}, {id: 'route2'}]}/>)
        expect(wrapper.find(RouteWithSubRoutes)).to.have.length(2)
      })
    })
  })
})
