import remote from './remote'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableComponentConfigs', () => {
      describe('remote', () => {
        describe('createPermission', () => {
          const getFormField = additionalProperties => ({
            relationName: 'relCountry',
            id: 'relCountry',
            ...additionalProperties
          })

          const getFormData = relationModel => ({
            intl: {
              formatMessage: id => id
            },
            entityModel: {
              paths: {
                relCountry: relationModel
              }
            }
          })

          test('should return undefined if no relation name is passed', () => {
            const formField = {}
            const formData = getFormData()
            const options = remote.getOptions({formField, formData})

            expect(options.createPermission).to.be.undefined
          })

          test('should return false if createPermission is not set', () => {
            const formField = getFormField()
            const formData = getFormData()
            const options = remote.getOptions({formField, formData})

            expect(options.createPermission).to.be.false
          })

          test('should return true if createPermission is true and other properties are undefined', () => {
            const formField = getFormField({displayCreateButton: undefined})
            const customFormData = getFormData({createPermission: true, useRemoteFieldNewButton: undefined})
            const options = remote.getOptions({formField, formData: customFormData})

            expect(options.createPermission).to.be.true
          })

          test('should return false if useRemoteFieldNewButton is false', () => {
            const formField = getFormField()
            const customFormData = getFormData({createPermission: true, useRemoteFieldNewButton: false})
            const options = remote.getOptions({formField, formData: customFormData})

            expect(options.createPermission).to.be.false
          })

          test('should return false if displayCreateButton is false', () => {
            const formField = getFormField({displayCreateButton: false})
            const customFormData = getFormData({createPermission: true})
            const options = remote.getOptions({formField, formData: customFormData})

            expect(options.createPermission).to.be.false
          })

          test('should return true if all properties are true', () => {
            const formField = getFormField({displayCreateButton: true})
            const customFormData = getFormData({createPermission: true, useRemoteFieldNewButton: true})
            const options = remote.getOptions({formField, formData: customFormData})

            expect(options.createPermission).to.be.true
          })
        })
      })
    })
  })
})
