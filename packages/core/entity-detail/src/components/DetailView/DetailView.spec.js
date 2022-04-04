import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import DetailFormContainer from '../../containers/DetailFormContainer'
import DetailView from './DetailView'

const EMPTY_FUNC = () => {}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailView', () => {
      test('should render', () => {
        const routerProp = {
          match: {
            params: {
              entityId: 1
            }
          }
        }

        const wrapper = shallow(
          <DetailView
            intl={IntlStub}
            router={routerProp}
            loadDetailView={EMPTY_FUNC}
            closeEntityDetail={EMPTY_FUNC}
            entityModel={{}}
            fieldDefinitions={[]}
            entityName="User"
            entityId="21"
            modelPaths={[]}
            unloadDetailView={EMPTY_FUNC}
            loadRemoteEntity={EMPTY_FUNC}
            remoteEntities={{}}
            saveEntity={EMPTY_FUNC}
            submitForm={EMPTY_FUNC}
            logError={EMPTY_FUNC}
          />
        )

        expect(wrapper.find(DetailFormContainer)).to.have.length(1)
      })
    })
  })
})
