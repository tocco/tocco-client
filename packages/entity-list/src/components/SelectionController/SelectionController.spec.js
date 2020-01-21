import React from 'react'
import {enzymeUtil} from 'tocco-test-util'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'

import SelectionController from './SelectionController'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    const baseProps = {
      clearSelection: EMPTY_FUNC,
      intl: {formatMessage: EMPTY_FUNC},
      queryCount: 123,
      selection: [],
      setSelectionMode: EMPTY_FUNC,
      toggleShowSelectedRecords: EMPTY_FUNC
    }

    describe('Selection', () => {
      it('should display message selectionQuery and queryCount', () => {
        const wrapper = enzymeUtil.mountEmbedded(<SelectionController {...baseProps}/>)
        expect(wrapper.find(FormattedMessage).at(0).prop('values').count).to.be.equal(123)
        expect(wrapper.find(Button)).to.have.length(0)
      })

      it('should display message selectionSelection and count of selected items ', () => {
        const selection = new Array(99)
        const wrapper = enzymeUtil.mountEmbedded(<SelectionController {...baseProps} selection={selection}/>)
        expect(wrapper.find(FormattedMessage).at(1).prop('id')).to.be.equal('client.entity-list.selectionSelection')
        expect(wrapper.find(FormattedMessage).at(1).prop('values').count).to.be.equal(99)
        expect(wrapper.find(Button)).to.have.length(1)
      })
    })
  })
})
