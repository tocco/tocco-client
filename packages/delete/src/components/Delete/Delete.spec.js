import React from 'react'
import {intlStub, intlEnzyme} from 'tocco-test-util'
import {LoadMask} from 'tocco-ui'

import {dialogInfo} from '../../utils/deleteRequestParser.spec'
import Delete from './Delete'
import Dialog from '../Dialog'

describe('delete', () => {
  describe('components', () => {
    describe('Delete', () => {
      it('should render', () => {
        const loadSpy = sinon.spy()
        const wrapper = intlEnzyme.shallowWithIntl(
          <Delete intl={intlStub} dialogInfo={null} loadDialogInfo={loadSpy}/>
        )
        expect(wrapper.find(LoadMask)).to.have.length(1)
      })

      it('should render Dialog if dialogInfo is set', () => {
        const wrapper = intlEnzyme.shallowWithIntl(
          <Delete intl={intlStub} dialogInfo={dialogInfo} loadDialogInfo={() => {}}/>
        )
        expect(wrapper.find(Dialog)).to.have.length(1)
      })
    })
  })
})
