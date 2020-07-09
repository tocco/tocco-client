import deleteRequestParser from './deleteRequestParser'

const exampleResponse = {
  entitiesToDelete: [
    {
      rootEntity: {
        entityName: 'User',
        key: '100',
        entityLabel: 'Person',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [{
        entityName: 'Resource',
        key: '17719',
        entityLabel: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityName: 'Resource',
        key: '33',
        entityLabel: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityName: 'Output_job_item',
        key: '10303',
        entityLabel: 'Einzeldokumente',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      }],
      unreadableEntities: false
    },
    {
      rootEntity: {
        entityName: 'User',
        key: '9',
        entityLabel: 'Person',
        businessUnitId: null,
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      affectedEntities: [
        {
          entityName: 'Resource',
          key: '44',
          entityLabel: 'Dokument',
          businessUnitId: 'test1',
          deleteStatus: 'NO_DELETE_PERMISSION'
        },
        {
          entityName: 'Order',
          key: '1023',
          entityLabel: 'Auftrag',
          businessUnitId: 'test1',
          deleteStatus: 'DENIED_BY_CASCADE'
        },
        {
          entityName: 'Resource',
          key: '20000',
          entityLabel: 'Dokument',
          businessUnitId: 'test1',
          deleteStatus: 'NO_DELETE_PERMISSION'
        }
      ],
      unreadableEntities: true
    },
    {
      rootEntity: {
        entityName: 'User',
        key: '1',
        entityLabel: 'Person',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [{
        entityName: 'Resource',
        key: '20000',
        entityLabel: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      {
        entityName: 'Resource',
        key: '583',
        entityLabel: 'Dokument',
        businessUnitId: 'test2',
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      {
        entityName: 'Resource',
        key: '1001',
        entityLabel: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityName: 'Effort',
        key: '122',
        entityLabel: 'Leistung',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      }
      ],
      unreadableEntities: false
    }
  ]
}

export const dialogInfo = {
  entityName: 'User',
  entityLabel: 'Person',
  keysDeletable: ['100'],
  keysNotDeletable: ['9', '1'],
  relatedDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['17719', '33'],
      keysOtherBu: []
    },
    Output_job_item: {
      entityLabel: 'Einzeldokumente',
      keys: ['10303'],
      keysOtherBu: []
    }
  },
  relatedNotDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['44', '20000'],
      keysOtherBu: ['583']
    },
    Order: {
      entityLabel: 'Auftrag',
      keys: ['1023'],
      keysOtherBu: []
    }
  },
  hasUnreadableEntities: true
}

describe('delete', () => {
  describe('util', () => {
    describe('deleteResponseParser', () => {
      test('should transform the response to desired format', () => {
        const result = deleteRequestParser(exampleResponse, 'test1')
        expect(result).to.deep.eql(dialogInfo)
      })
    })
  })
})
