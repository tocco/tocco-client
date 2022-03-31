import {shallow} from 'enzyme'

import ListViewContainer from '../../containers/ListViewContainer'
import SearchViewContainer from '../../containers/SearchViewContainer'
import searchFormTypes from '../../util/searchFormTypes'
import EntityList from './EntityList'

describe('entity-list', () => {
  describe('components', () => {
    describe('EntityList', () => {
      test('should render ListView', () => {
        const wrapper = shallow(<EntityList />)

        expect(wrapper.find(ListViewContainer)).to.have.length(1)
      })

      test('should show searchForm depending on prop', () => {
        const wrapper = shallow(<EntityList searchFormType={searchFormTypes.NONE} />)
        expect(wrapper.find(SearchViewContainer)).to.have.length(0)
        wrapper.setProps({searchFormType: searchFormTypes.SIMPLE_ADVANCED})
        expect(wrapper.find(SearchViewContainer)).to.have.length(1)
      })
    })
  })
})
