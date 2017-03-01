import React from 'react'
import DetailView from './DetailView'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('DetailView', () => {
      it('should render', () => {
        const routerProp = {
          match: {
            params: {
              entityId: 1
            }
          }
        }

        const wrapper = shallow(<DetailView
          router={routerProp}
          loadDetailView={EMPTY_FUNC}
          formDefinition={{children: []}}
          closeEntityDetail={EMPTY_FUNC}
          entity={{}}
          entityModel={{}}
          saveEntity={EMPTY_FUNC}
          submitForm={EMPTY_FUNC}
          logError={EMPTY_FUNC}
        />)

        expect(wrapper.find('.detail-view')).to.have.length(1)
      })
    })
  })
})
