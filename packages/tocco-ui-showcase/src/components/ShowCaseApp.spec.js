import React from 'react'
import {mount} from 'enzyme'
import ShowCaseApp from './ShowCaseApp'

const cpn = () => {return ''}
cpn.propTypes = {}

var cpnRaw = `
import React from 'react'
import classNames from 'classnames'

/**
 * SampleComponent
 */
const SampleComponent = props => {
  return <div/>
}

SaveButton.propTypes = {
  /**
   * some text
   */
  sample: React.PropTypes.string.isRequired,
}

export default SampleComponent
`

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

        const wrapper = mount(<ShowCaseApp componentsTree={componentsTree} />)

        expect(wrapper.find('ShowCase')).to.have.length(2);
        expect(wrapper.find('section')).to.have.length(3);
      })
    })
  })
})
