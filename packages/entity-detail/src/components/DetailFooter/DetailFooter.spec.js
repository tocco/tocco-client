import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import DetailFooter from './DetailFooter'
import FooterItem from './FooterItem'

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailFooter', () => {
      test(
        'should display the reduced footer for entities without nice fields',
        () => {
          const mode = 'update'
          const entityModel = {
            useNiceFields: false
          }
          const entity = {
            paths: {
              pk: {
                value: 1
              }
            }
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <DetailFooter mode={mode} entity={entity} entityModel={entityModel}/>
          )

          expect(wrapper.find(FooterItem)).to.have.length(1)
        }
      )

      test(
        'should display the full footer for entities with nice fields',
        () => {
          const mode = 'update'
          const entityModel = {
            useNiceFields: true
          }
          const entity = {
            paths: {
              pk: {
                value: 1
              },
              create_timestamp: {
                value: '2018-05-03T11:32:19.015Z'
              },
              create_user: {
                value: ''
              },
              update_timestamp: {
                value: '2018-05-03T11:32:19.015Z'
              },
              update_user: {
                value: ''
              },
              version: {
                value: 3
              }
            }
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <DetailFooter mode={mode} entity={entity} entityModel={entityModel}/>
          )

          expect(wrapper.find(FooterItem)).to.have.length(6)
        }
      )

      test(
        'should not display the footer for `create` mode',
        () => {
          const mode = 'create'
          const entityModel = {
            useNiceFields: true
          }
          const entity = {
            paths: {
              pk: {
                value: 1
              },
              create_timestamp: {
                value: '2018-05-03T11:32:19.015Z'
              },
              create_user: {
                value: ''
              },
              update_timestamp: {
                value: '2018-05-03T11:32:19.015Z'
              },
              update_user: {
                value: ''
              },
              version: {
                value: 3
              }
            }
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <DetailFooter mode={mode} entity={entity} entityModel={entityModel}/>
          )

          expect(wrapper.find(FooterItem)).to.have.length(0)
        }
      )
    })
  })
})
