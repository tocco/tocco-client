import {getEditableValueProps} from './formFieldUtil'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
      describe('formFieldUtil', () => {
        it('should get editable value props for RemoteField', () => {
          const formField = {
            type: 'ch.tocco.nice2.model.form.components.simple.RemoteField'
          }

          const modelField = {
            targetEntity: 'Dummy'
          }

          const formatMessage = sinon.spy()

          const util = {
            intl: {
              formatMessage: formatMessage
            }
          }

          const props = getEditableValueProps(formField, modelField, util)

          const id1 = {id: 'client.component.remoteselect.searchPromptText'}
          const id2 = {id: 'client.component.remoteselect.clearValueText'}
          const id3 = {id: 'client.component.remoteselect.clearAllText'}

          expect(formatMessage).to.have.been.calledWith(id1)
          expect(formatMessage).to.have.been.calledWith(id2)
          expect(formatMessage).to.have.been.calledWith(id3)

          expect(typeof props.options.fetchOptions).to.be.eql('function')
          expect(props.events).to.be.eql({})
        })

        it('should get editable value props for MultiRemoteField', () => {
          const formField = {
            type: 'ch.tocco.nice2.model.form.components.simple.MultiRemoteField'
          }

          const modelField = {
            targetEntity: 'Dummy'
          }

          const formatMessage = sinon.spy()

          const util = {
            intl: {
              formatMessage: formatMessage
            }
          }

          const props = getEditableValueProps(formField, modelField, util)

          const id1 = {id: 'client.component.remoteselect.searchPromptText'}
          const id2 = {id: 'client.component.remoteselect.clearValueText'}
          const id3 = {id: 'client.component.remoteselect.clearAllText'}

          expect(formatMessage).to.have.been.calledWith(id1)
          expect(formatMessage).to.have.been.calledWith(id2)
          expect(formatMessage).to.have.been.calledWith(id3)

          expect(typeof props.options.fetchOptions).to.be.eql('function')
          expect(props.events).to.be.eql({})
        })
      })
    })
  })
})
