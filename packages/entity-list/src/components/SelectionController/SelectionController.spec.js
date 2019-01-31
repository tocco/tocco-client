import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
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
      it('should display message operateOnQueriedItems and queryCount', () => {
        const wrapper = intlEnzyme.mountWithIntl(<SelectionController {...baseProps}/>)
        expect(wrapper.find(FormattedMessage).prop('id')).to.be.equal('client.entity-list.operateOnQueriedItems')
        expect(wrapper.find(FormattedMessage).prop('values').count).to.be.equal(123)
        expect(wrapper.find(Button)).to.have.length(0)
      })

      it('should display message operateOnSelectedItems and count of selected items ', () => {
        const selection = new Array(99)
        const wrapper = intlEnzyme.mountWithIntl(<SelectionController {...baseProps} selection={selection}/>)
        expect(wrapper.find(FormattedMessage).prop('id')).to.be.equal('client.entity-list.operateOnSelectedItems')
        expect(wrapper.find(FormattedMessage).prop('values').count).to.be.equal(99)
        expect(wrapper.find(Button)).to.have.length(2)
        expect(wrapper.find(Button).first().prop('label')).to.be.equal('client.entity-list.showSelectedItemsOnly')
      })
    })
  })
})
