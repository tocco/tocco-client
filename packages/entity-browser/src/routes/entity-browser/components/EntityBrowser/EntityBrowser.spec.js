import React from 'react'
import {shallow} from 'enzyme'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import EntityBrowser from './EntityBrowser'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      it('should map routes', () => {
        const initSpy = sinon.spy()
        const wrapper = shallow(<EntityBrowser initialize={initSpy} routes={[{id: 'route1'}, {id: 'route2'}]}/>)
        expect(wrapper.find(RouteWithSubRoutes)).to.have.length(2)
        expect(initSpy).to.have.calledOnce
      })
    })
  })
})
