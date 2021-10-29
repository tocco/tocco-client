import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import MenuItem from './MenuItem'

/* eslint-disable react/prop-types */

const AComp = ({item: {label}}) => <div>{label}</div>
const WrapperComp = ({children}) => <div>{children}</div>

const typeMapping = {
  a: {
    component: AComp,
    childrenWrapperComponent: WrapperComp,
    props: {},
    filterAttributes: []
  }
}

describe('admin', () => {
  describe('components', () => {
    describe('MenuTree', () => {
      describe('MenuItem', () => {
        test('should pass menuTreePath correctly to children', () => {
          const children = [{
            name: 'person',
            menuType: 'a'
          }]

          const props = {
            item: {
              name: 'address',
              children,
              menuType: 'a'
            },
            menuTreePath: 'address',
            typeMapping
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <MenuItem {...props}/>
          )

          expect(wrapper.find(AComp)).to.have.length(2)
          expect(wrapper.find(AComp).at(0).prop('menuTreePath')).to.equal('address')
          expect(wrapper.find(AComp).at(1).prop('menuTreePath')).to.equal('address.person')
        })

        test('should not render children wrapper when no children are present', () => {
          const props = {
            item: {
              name: 'address',
              children: [],
              menuType: 'a'
            },
            menuTreePath: 'address',
            typeMapping
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <MenuItem {...props}/>
          )

          expect(wrapper.find(AComp)).to.have.length(1)
          expect(wrapper.find(AComp).at(0).prop('item').name).to.equal('address')
          expect(wrapper.find(WrapperComp)).to.have.length(0)
        })
      })
    })
  })
})
