import React from 'react'
import {mount} from 'enzyme'
import ShowCaseApp from './ShowCaseApp'

import ToccoLogoRaw from '!raw!../../../tocco-ui/src/ToccoLogo/ToccoLogo'
import ToccoLogoExample from '../../../tocco-ui/src/ToccoLogo/example'
import ToccoLogoExampleRaw from '!raw!../../../tocco-ui/src/ToccoLogo/example'

describe('tocco-ui-showcase', function() {
  describe('components', function() {
    describe('ShowCaseApp', function() {
      it('should render showcases from component tree and create sections for category and component', () => {

        var componentsTree =[
          {
            category: 'FORMS',
            components: [
              {
                name: 'ToccoLogo',
                raw: ToccoLogoRaw,
                example: {
                  component: ToccoLogoExample,
                  raw: ToccoLogoExampleRaw
                }
              },
              {
                name: 'ToccoLogo2',
                raw: ToccoLogoRaw,
                example: {
                  component: ToccoLogoExample,
                  raw: ToccoLogoExampleRaw
                }
              }]
          }
        ]

        const wrapper = mount(<ShowCaseApp componentsTree={componentsTree} />)

        expect(wrapper.find('ShowCase')).to.have.length(2);
        expect(wrapper.find('section')).to.have.length(3);
      })
    })
  })
})
