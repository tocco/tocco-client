import * as form from './form'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('form', () => {
        describe('getFieldsOfDetailForm', () => {
          it('get array of fields', () => {
            const formDefinition = {
              name: 'fromX',
              children: [
                {
                  type: 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
                  name: 'box 1',
                  children: [
                    {
                      type: 'ch.tocco.nice2.model.form.components.layout.HorizontalBox1',
                      name: 'box 2',
                      children: [
                        {
                          name: 'firstname',
                          type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                        },
                        {
                          name: 'lastname',
                          type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'xyz',
                  type: 'ch.tocco.nice2.model.form.components.simple.SomeType'
                }
              ]
            }

            const fields = form.getFieldsOfDetailForm(formDefinition)
            expect(fields).to.eql(['firstname', 'lastname', 'xyz'])
          })
        })
      })
    })
  })
})
