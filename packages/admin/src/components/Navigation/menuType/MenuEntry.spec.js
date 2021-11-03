import {expect} from 'chai'
import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {Icon} from 'tocco-ui'

import MenuEntry from './MenuEntry'

describe('admin', () => {
  describe('components', () => {
    describe('Navigation', () => {
      describe('menuType', () => {
        describe('MenuEntry', () => {
          test('should show collapsible icon', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: true,
              saveUserPreferences: () => {},
              menuTreePath: 'address',
              isOpen: false,
              preferencesPrefix: ''
            }

            const wrapper = intlEnzyme.mountWithIntl(
              <MenuEntry {...props}/>
            )

            expect(wrapper.find(Icon)).to.have.length(1)
          })

          test('should not show collapsible icon for non-collapsible entries', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: false,
              saveUserPreferences: () => {},
              menuTreePath: 'address',
              isOpen: undefined,
              preferencesPrefix: undefined
            }

            const wrapper = intlEnzyme.mountWithIntl(
              <MenuEntry {...props}/>
            )

            expect(wrapper.find(Icon)).to.have.length(0)
          })

          test('should be able to expand and collapse', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: true,
              saveUserPreferences: sinon.spy(),
              menuTreePath: 'address',
              isOpen: false,
              preferencesPrefix: ''
            }

            const wrapper = intlEnzyme.mountWithIntl(
              <MenuEntry {...props}/>
            )

            // expand
            wrapper.simulate('click')
            expect(props.saveUserPreferences).to.have.been.calledWith({'admintree.address.collapsed': false})

            // collapse
            wrapper.setProps({isOpen: true})
            wrapper.simulate('click')
            expect(props.saveUserPreferences).to.have.been.calledWith({'admintree.address.collapsed': true})
          })
        })
      })
    })
  })
})
