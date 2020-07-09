import React from 'react'
import {shallow} from 'enzyme'
import {Button, SignalBox} from 'tocco-ui'

import Dialog from './Dialog'
import InfoPart from '../InfoPart'
import {dialogInfo} from '../../utils/deleteRequestParser.spec'

describe('delete', () => {
  describe('components', () => {
    describe('Dialog', () => {
      it('should render Dialog if dialogInfo is set', () => {
        const wrapper = shallow(<Dialog doDelete={() => {}} onCancel={() => {}} dialogInfo={dialogInfo}/>)
        expect(wrapper.find(InfoPart)).to.have.length(2)
        expect(wrapper.find(SignalBox)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(2)
      })
    })
  })
})
