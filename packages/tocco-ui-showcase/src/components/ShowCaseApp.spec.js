/* eslint-disable no-unused-vars */
import React from 'react'
import {mount} from 'enzyme'
import ShowCaseApp from './ShowCaseApp'

const cpn = () => ''
cpn.propTypes = {}

const cpnRaw = `
import React from 'react'
import classNames from 'classnames'

/**
 * SampleComponent
 */
const SampleComponent = props => <div/>

SampleComponent.propTypes = {
  /**
   * some text
   */
  sample: PropTypes.string.isRequired
}

export default SampleComponent
`

/*
        TODO: Fix to work with enzyme 3
describe('tocco-ui-showcase', function() {
  describe('components', function() {
    describe('ShowCaseApp', function() {
      it('should render showcases from component tree and create sections for category and component', () => {
        const componentsTree = [
          {
            category: 'FORMS',
            components: [
              {
                name: 'ToccoLogo',
                raw: cpnRaw,
                example: {
                  component: cpn,
                  raw: cpnRaw
                }
              },
              {
                name: 'ToccoLogo2',
                raw: cpnRaw,
                example: {
                  component: cpn,
                  raw: cpnRaw
                }
              }]
          }
        ]

        const wrapper = mount(<ShowCaseApp componentsTree={componentsTree}/>)

        expect(wrapper.find('ComponentShowCase')).to.have.length(2)
        expect(wrapper.find('section')).to.have.length(3)
      })
    })
  })
})
*/
