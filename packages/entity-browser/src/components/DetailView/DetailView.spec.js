import React from 'react'
import DetailView from './DetailView'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render', () => {
        const wrapper = shallow(<DetailView
          formDefinition={{children: {}}}
          closeEntityDetail={EMPTY_FUNC}
          entity={{}}
          saveEntity={EMPTY_FUNC}
          stores={{}}
        />)

        expect(wrapper.find('.detail-view')).to.have.length(1)
      })
    })
  })
})
