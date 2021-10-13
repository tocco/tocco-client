import React from 'react'
import {shallow} from 'enzyme'

import InfoBoxContent from './InfoBoxContent'
import InfoBoxHtmlFieldContent from './typeContent/InfoBoxHtmlFieldContent'
import InfoBoxSearchFilterContent from './typeContent/InfoBoxSearchFilterContent'

describe('dashboard', () => {
  describe('components', () => {
    describe('InfoBox', () => {
      describe('InfoBoxContent', () => {
        test('should render a htlmfield content', () => {
          const content = {
            type: 'htmlfield'
          }
          const wrapper = shallow(<InfoBoxContent content={content} id="info-box"/>)
          expect(wrapper.find(InfoBoxHtmlFieldContent)).to.have.length(1)
        })
        
        test('should render a searchfilter content', () => {
          const content = {
            type: 'searchfilter'
          }
          const wrapper = shallow(<InfoBoxContent content={content} id="info-box"/>)
          expect(wrapper.find(InfoBoxSearchFilterContent)).to.have.length(1)
        })

        test('should render nothing for unknown type', () => {
          const content = {
            type: 'anything'
          }
          const wrapper = shallow(<InfoBoxContent content={content} id="info-box"/>)
          expect(wrapper.children()).to.have.length(0)
        })
      })
    })
  })
})
