import {dialogInfo} from '../dev/dialogInfoExample'
import {getDialogInfo, getEntitiesToDelete} from './deleteRequestParser'

describe('delete', () => {
  describe('util', () => {
    describe('deleteRequestParser', () => {
      describe('getDialogInfo', () => {
        test('should transform the response to desired format', () => {
          const result = getDialogInfo(exampleResponse, 'test1')
          expect(result).to.deep.eql(dialogInfo)
        })

        test('should handle Session only entities', () => {
          const result = getDialogInfo(exampleResponseSessionOnly, 'test1')
          expect(result).to.deep.eql(dialogInfoSessionOnly)
        })

        test('should set empty root entity if none is deletable', () => {
          const response = {
            entitiesToDelete: [
              {
                rootEntity: {
                  entityName: 'User',
                  key: '100',
                  entityLabel: 'Person',
                  businessUnitId: null,
                  deleteStatus: 'NO_DELETE_PERMISSION'
                },
                affectedEntities: [],
                unreadableEntities: false
              },
              {
                rootEntity: {
                  entityName: 'Event',
                  key: '22',
                  entityLabel: 'Veranstaltung',
                  businessUnitId: null,
                  deleteStatus: 'DELETABLE'
                },
                affectedEntities: [],
                unreadableEntities: false
              }
            ]
          }

          const result = getDialogInfo(response)
          const expectedResult = {
            rootEntitiesDeletable: {
              User: {
                entityLabel: 'Person',
                keys: []
              },
              Event: {
                entityLabel: 'Veranstaltung',
                keys: ['22']
              }
            },
            rootEntitiesNotDeletable: {
              User: {
                entityLabel: 'Person',
                keys: ['100']
              }
            },
            relatedDeletable: {},
            relatedNotDeletable: {},
            hasUnreadableEntities: false
          }

          expect(result).to.deep.eql(expectedResult)
        })
      })

      describe('getEntitiesToDelete', () => {
        test('should transform the response to desired format', () => {
          const result = getEntitiesToDelete(exampleResponse)
          const expectedResult = {
            entityName: 'User',
            keys: ['100']
          }
          expect(result).to.deep.eql(expectedResult)
        })

        test('should handle Session only entities', () => {
          const result = getEntitiesToDelete(exampleResponseSessionOnly)
          const expectedResult = {
            entityName: 'Doc_list_item',
            keys: ['Resource/2255', 'Folder/892']
          }
          expect(result).to.deep.eql(expectedResult)
        })
      })
    })
  })
})

const exampleResponseSessionOnly = {
  entitiesToDelete: [
    {
      rootEntity: {
        entityName: 'Doc_list_item',
        key: 'Resource/2255',
        entityLabel: 'Dokument',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [],
      unreadableEntities: false
    },
    {
      rootEntity: {
        entityName: 'Doc_list_item',
        key: 'Folder/3',
        entityLabel: 'Ordner',
        businessUnitId: null,
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      affectedEntities: [
        {
          entityName: 'Resource',
          key: '10785',
          entityLabel: 'Dokument',
          businessUnitId: null,
          deleteStatus: 'NO_DELETE_PERMISSION'
        }
      ],
      unreadableEntities: false
    },
    {
      rootEntity: {
        entityName: 'Doc_list_item',
        key: 'Folder/892',
        entityLabel: 'Ordner',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [
        {
          entityName: 'Resource',
          key: '13380',
          entityLabel: 'Dokument',
          businessUnitId: null,
          deleteStatus: 'DELETABLE'
        },
        {
          entityName: 'Resource',
          key: '10786',
          entityLabel: 'Dokument',
          businessUnitId: null,
          deleteStatus: 'DELETABLE'
        }
      ]
    }
  ]
}

export const dialogInfoSessionOnly = {
  rootEntitiesDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['2255']
    },
    Folder: {
      entityLabel: 'Ordner',
      keys: ['892']
    }
  },
  rootEntitiesNotDeletable: {
    Folder: {
      entityLabel: 'Ordner',
      keys: ['3']
    }
  },
  relatedDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['13380', '10786'],
      keysOtherBu: []
    }
  },
  relatedNotDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['10785'],
      keysOtherBu: []
    }
  },
  hasUnreadableEntities: false
}

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
      affectedEntities: [
        {
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
        }
      ],
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
      affectedEntities: [
        {
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
