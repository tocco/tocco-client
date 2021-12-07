import {shallow} from 'enzyme'
import React from 'react'
import {Button, SignalBox} from 'tocco-ui'

import {dialogInfo} from '../../utils/deleteRequestParser.spec'
import InfoPart from '../InfoPart'
import Dialog from './Dialog'

describe('delete', () => {
  describe('components', () => {
    describe('Dialog', () => {
      it('should render Dialog if dialogInfo is set', () => {
        const wrapper = shallow(<Dialog doDelete={() => {}} onCancel={() => {}} dialogInfo={dialogInfo} />)
        expect(wrapper.find(InfoPart)).to.have.length(2)
        expect(wrapper.find(SignalBox)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(2)
      })
    })
  })
})
