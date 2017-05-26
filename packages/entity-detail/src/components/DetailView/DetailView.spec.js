import React from 'react'
import DetailView from './DetailView'
import DetailForm from '../DetailForm'
import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

describe('entity-detail', () => {
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
          intl={IntlStub}
          router={routerProp}
          loadDetailView={EMPTY_FUNC}
          formDefinition={{children: []}}
          closeEntityDetail={EMPTY_FUNC}
          entity={{}}
          entityModel={{}}
          entityId="21"
          modelPaths={[]}
          unloadDetailView={EMPTY_FUNC}
          loadRelationEntity={EMPTY_FUNC}
          loadRemoteEntity={EMPTY_FUNC}
          relationEntities={{}}
          remoteEntities={{}}
          saveEntity={EMPTY_FUNC}
          submitForm={EMPTY_FUNC}
          logError={EMPTY_FUNC}
          fireTouched={EMPTY_FUNC}
        />)

        expect(wrapper.find('.detail-view')).to.have.length(1)
        expect(wrapper.find(DetailForm)).to.have.length(1)
      })
    })
  })
})
