import React from 'react'
import {shallow} from 'enzyme'
import {route as routeUtil} from 'tocco-util'

import EntityBrowser from './EntityBrowser'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      test('should map routes', () => {
        const wrapper = shallow(<EntityBrowser routes={[{id: 'route1'}, {id: 'route2'}]}/>)
        expect(wrapper.find(routeUtil.RouteWithSubRoutes)).to.have.length(2)
      })
    })
  })
})
