import _omit from 'lodash/omit'

import {getColumnDefinition} from './table'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('getColumnDefinition', () => {
        test('should return an array', () => {
          const field1 = {id: 'name1', componentType: 'field', dataType: 'string', label: 'label'}
          const field2 = {id: 'name2', componentType: 'field', dataType: 'decimal', label: 'label'}

          const columns = [
            {
              id: 'lb1',
              label: 'label1',
              useLabel: 'YES',
              children: [field1],
              sortable: true,
              widthFixed: false,
              width: null
            }, {
              id: 'lb2',
              label: 'label2',
              children: [field2],
              sortable: false,
              widthFixed: true,
              width: 500
            }
          ]

          const result = getColumnDefinition(columns)

          const expectedColumnDefinition = [
            {
              label: 'label1',
              id: 'lb1',
              idx: 0,
              children: [field1],
              sorting: {sortable: true},
              resizable: true,
              rightAligned: false
            },
            {
              label: 'label2',
              id: 'lb2',
              idx: 1,
              children: [field2],
              sorting: {sortable: false},
              resizable: false,
              rightAligned: true
            }
          ]

          expect(result[0]).to.have.property('CellRenderer')
          expect(result.map(r => _omit(r, ['CellRenderer']))).to.eql(expectedColumnDefinition)
        })

        test('should ignore HIDDEN columns and hidden fields', () => {
          const field1 = {id: 'name1', componentType: 'field', label: 'label'}
          const field2Hidden = {id: 'name2', componentType: 'field', hidden: true, label: 'label'}

          const columns = [
            {
              hidden: false,
              id: 'lb1',
              label: 'label1',
              children: [field1],
              sortable: true,
              widthFixed: false,
              width: null
            }, {
              hidden: false,
              id: 'lb2',
              label: 'label2',
              children: [field2Hidden],
              sortable: true,
              widthFixed: false,
              width: null
            },
            {
              hidden: true,
              id: 'lb3',
              label: 'label3',
              children: [field1],
              sortable: true,
              widthFixed: false,
              width: null
            }
          ]

          const result = getColumnDefinition(columns)

          expect(result).to.have.length(1)
          expect(result[0].id).to.eql('lb1')
        })
      })
    })
  })
})
