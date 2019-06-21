import React from 'react'
import {IntlStub, intlEnzyme, TestThemeProvider} from 'tocco-test-util'

import MergeMatrix from './MergeMatrix'
import {HeaderRow, ToManyRelationRow, FieldRow, RelationRow} from './table-components'

describe('merge', () => {
  describe('components', () => {
    describe('MergeMatrix', () => {
      test(
        'should load the matrix as a table with the desired amount of rows ',
        () => {
          const emptyFnc = () => {
          }

          const wrapper = intlEnzyme.mountWithIntl(
            <TestThemeProvider>
              <MergeMatrix
                intl={IntlStub}
                targetEntityPk="498"
                entities={testData.entities}
                model={testData.model}
                selections={{fields: {}, relations: {}, toManyRelations: {}}}
                changeTargetEntity={emptyFnc}
                selectSourceField={emptyFnc}
                selectSourceRelation={emptyFnc}
                toggleRelationMany={emptyFnc}
              />
            </TestThemeProvider>
          )

          expect(wrapper.find('table')).to.have.length(1)
          expect(wrapper.find(HeaderRow)).to.have.length(1)
          expect(wrapper.find(FieldRow)).to.have.length(testData.model.fields.length)
          expect(wrapper.find(RelationRow)).to.have.length(testData.model.relations.filter(r => r.toMany).length)
          expect(wrapper.find(ToManyRelationRow)).to.have.length(testData.model.relations.filter(r => r.toMany).length)
        }
      )
    })
  })
})

const testData = {
  entities: [
    {
      fields: {
        user_nr: {
          name: 'user_nr',
          type: 'counter',
          value: 62,
          writable: false
        },
        email: {
          name: 'email',
          type: 'email',
          value: 'mergi@test.ch',
          writable: true
        },
        callname: {
          name: 'callname',
          type: 'string',
          value: 'mergi',
          writable: true
        },
        birthdate: {
          name: 'birthdate',
          type: 'birthdate',
          value: '',
          writable: true
        },
        phone_company: {
          name: 'phone_company',
          type: 'phone',
          value: '+41445228899',
          writable: true
        },
        phone_mobile: {
          name: 'phone_mobile',
          type: 'phone',
          value: '+41796257841',
          writable: true
        },
        best_reached: {
          name: 'best_reached',
          type: 'string',
          value: 'Mittags',
          writable: true
        },
        c_address: {
          name: 'c_address',
          type: 'text',
          value: 'Tocco AG, Technology meets spirit\nRiedtlistrasse 27\n8006 Zürich',
          writable: false
        },
        b_address: {
          name: 'b_address',
          type: 'text',
          value: 'Tocco AG, Technology meets spirit\nRiedtlistrasse 27\n8006 Zürich',
          writable: false
        }
      },
      label: 'Test, Merge',
      pk: '498',
      relations: {
        relAcademic_title: {
          name: 'relAcademic_title',
          values: [
            {
              checked: true,
              label: 'Dr.',
              pk: '1'
            }
          ],
          writable: true
        },
        relUser_code2: {
          name: 'relUser_code2',
          values: [
            {
              checked: true,
              label: 'Lieferant',
              pk: '3'
            },
            {
              checked: false,
              label: 'Partner',
              pk: '4'
            },
            {
              checked: true,
              label: 'Mitarbeiter',
              pk: '2'
            }
          ],
          writable: true
        }
      }
    },
    {
      fields: {
        user_nr: {
          name: 'user_nr',
          type: 'counter',
          value: 68,
          writable: false
        },
        email: {
          name: 'email',
          type: 'email',
          value: 'test@test.merge.ch',
          writable: true
        },
        callname: {
          name: 'callname',
          type: 'string',
          value: '',
          writable: true
        },
        birthdate: {
          name: 'birthdate',
          type: 'birthdate',
          value: '1980-01-31',
          writable: true
        },
        phone_company: {
          name: 'phone_company',
          type: 'phone',
          value: '',
          writable: true
        },
        phone_mobile: {
          name: 'phone_mobile',
          type: 'phone',
          value: '',
          writable: true
        },
        best_reached: {
          name: 'best_reached',
          type: 'string',
          value: '',
          writable: true
        },
        c_address: {
          name: 'c_address',
          type: 'text',
          value: '',
          writable: false
        },
        b_address: {
          name: 'b_address',
          type: 'text',
          value: '',
          writable: false
        }
      },
      label: 'Test, Merge',
      pk: '504',
      relations: {
        relAcademic_title: {
          name: 'relAcademic_title',
          values: [],
          writable: true
        },
        relUser_code2: {
          name: 'relUser_code2',
          values: [
            {
              checked: false,
              label: 'Mitarbeiter',
              pk: '2'
            },
            {
              checked: false,
              label: 'Partner',
              pk: '4'
            },
            {
              checked: false,
              label: 'Lieferant',
              pk: '3'
            }
          ],
          writable: true
        }
      }
    },
    {
      fields: {
        user_nr: {
          name: 'user_nr',
          type: 'counter',
          value: 65,
          writable: false
        },
        email: {
          name: 'email',
          type: 'email',
          value: '',
          writable: true
        },
        callname: {
          name: 'callname',
          type: 'string',
          value: '',
          writable: true
        },
        birthdate: {
          name: 'birthdate',
          type: 'birthdate',
          value: null,
          writable: true
        },
        phone_company: {
          name: 'phone_company',
          type: 'phone',
          value: '',
          writable: true
        },
        phone_mobile: {
          name: 'phone_mobile',
          type: 'phone',
          value: '+41445239842',
          writable: true
        },
        best_reached: {
          name: 'best_reached',
          type: 'string',
          value: 'Mittags',
          writable: true
        },
        c_address: {
          name: 'c_address',
          type: 'text',
          value: 'Digitec Galaxus AG\nPfingstweidstrasse 60\n8005 Zürich',
          writable: false
        },
        b_address: {
          name: 'b_address',
          type: 'text',
          value: 'Digitec Galaxus AG\nPfingstweidstrasse 60\n8005 Zürich',
          writable: false
        }
      },
      label: 'Test, Merge',
      pk: '501',
      relations: {
        relAcademic_title: {
          name: 'relAcademic_title',
          values: [
            {
              checked: true,
              label: 'Prof. Dr.',
              pk: '3'
            }
          ],
          writable: true
        },
        relUser_code2: {
          name: 'relUser_code2',
          values: [
            {
              checked: true,
              label: 'Partner',
              pk: '4'
            },
            {
              checked: false,
              label: 'Mitarbeiter',
              pk: '2'
            },
            {
              checked: false,
              label: 'Lieferant',
              pk: '3'
            }
          ],
          writable: true
        }
      }
    }
  ],
  model: {
    fields: [
      {
        label: 'Personen-Nr.',
        name: 'user_nr'
      },
      {
        label: 'E-Mail',
        name: 'email'
      },
      {
        label: 'Rufname',
        name: 'callname'
      },
      {
        label: 'Geburtsdatum',
        name: 'birthdate'
      },
      {
        label: 'Telefon G',
        name: 'phone_company'
      },
      {
        label: 'Telefon M',
        name: 'phone_mobile'
      },
      {
        label: 'Beste Erreichbarkeit',
        name: 'best_reached'
      },
      {
        label: 'Korresp.-Adresse',
        name: 'c_address'
      },
      {
        label: 'Rg.-Adresse',
        name: 'b_address'
      }
    ],
    modelName: 'User',
    relations: [
      {
        label: 'Akad. Titel',
        name: 'relAcademic_title',
        toMany: false
      },
      {
        label: 'Personen-Code 2',
        name: 'relUser_code2',
        toMany: true
      }
    ]
  }
}
