import * as formBuilder from './formBuilder'

describe('entity-browser', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('formBuilder', () => {
        describe('getForm', () => {
          it('should call render fields', () => {
            const formDefinition = {
              'name': 'UserSearch_detail',
              'type': 'ch.tocco.nice2.model.form.components.Form',
              'displayType': 'READONLY',
              'children': [
                {
                  'name': 'box1',
                  'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
                  'displayType': 'READONLY',
                  'children': [
                    {
                      'name': 'box1',
                      'type': 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
                      'displayType': 'READONLY',
                      'children': [
                        {
                          'name': 'user_information',
                          'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
                          'displayType': 'READONLY',
                          'children': [
                            {
                              'name': 'firstname',
                              'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                              'displayType': 'READONLY',
                              'children': [],
                              'label': 'Vorname',
                              'useLabel': 'YES'
                            },
                            {
                              'name': 'lastname',
                              'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                              'displayType': 'READONLY',
                              'children': [],
                              'label': 'Nachname',
                              'useLabel': 'YES'
                            }
                          ]
                        }
                      ],
                      'label': '##forms.UserSearch_detail:de_CH:nice2.optional.usersearch',
                      'useLabel': 'YES'
                    }
                  ]
                }]
            }

            const createField = sinon.spy()

            const createLayoutComponent = (child, type, key, travers) => {
              travers()
            }

            formBuilder.getForm(formDefinition, createField, createLayoutComponent)
            expect(createField).to.have.been.calledTwice
          })
        })
      })
    })
  })
})
