import React from 'react'
import {render} from 'enzyme'

import InfoBoxHtmlFieldContent from './InfoBoxHtmlFieldContent'

describe('dashboard', () => {
  describe('components', () => {
    describe('InfoBox', () => {
      describe('typeContent', () => {
        describe('InfoBoxHtmlFieldContent', () => {
          test('should render html content', () => {
            const content = {
              text: '<p id="test">Hallo</p>'
            }
            const wrapper = render(
                <InfoBoxHtmlFieldContent content={content}/>
            )

            expect(wrapper.find('#test')).to.have.length(1)
            expect(wrapper.find('#test').text()).to.equal('Hallo')
          })

          test('should sanitize html before rendering it', () => {
            const content = {
              text: '<p id="test" onclick="alert(\'Hi!\')">Hallo</p>'
            }
            const wrapper = render(
                <InfoBoxHtmlFieldContent content={content}/>
            )

            expect(wrapper.find('#test').prop('id')).to.equal('test')
            expect(wrapper.find('#test').prop('onclick')).to.be.undefined
          })
        })
      })
    })
  })
})
