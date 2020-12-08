import reducer from './index'
import * as actions from './actions'

const selection = {
  entityName: 'USER',
  type: 'ID',
  ids: [
    1,
    2
  ]
}

describe('merge', () => {
  describe('modules', () => {
    describe('modules', () => {
      describe('merge', () => {
        describe('setSelectedSingle', () => {
          test('should set single selected', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '2',
                  lastname: '2'
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedSingle('firstname', '2')))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('setSelectedMultiple', () => {
          test('should set multiple selected (add)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    4000: '1'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '1', '4000', true)))
              .to.deep.equal(expectedStateAfter)
          })

          test('should set multiple selected (remove)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    5000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '1', '5000', false)))
              .to.deep.equal(expectedStateAfter)
          })

          test('should set multiple selected (override)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    6000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    6000: '2'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '2', '6000', true)))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('setSelectedMultipleAll', () => {
          test('should set multiple all selected (add to empty array)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: [],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['2'],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', true)))
              .to.deep.equal(expectedStateAfter)
          })

          test('should set multiple all selected (add)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['1'],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['1', '2'],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', true)))
              .to.deep.equal(expectedStateAfter)
          })

          test('should set multiple all selected (remove)', () => {
            const stateBefore = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['2'],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selection: selection,
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: [],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', false)))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('setTargetEntity', () => {
          test('should set target entity', () => {
            const sourceData = require('../../dev/data/sourceResponse.json')

            const stateBefore = {
              selection: selection,
              sourceData: sourceData,
              selected: {
                targetEntity: null,
                single: {},
                multiple: {},
                multipleAll: {}
              }
            }

            const expectedStateAfter = {
              sourceData: sourceData,
              selection: selection,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '1',
                  callname: '1',
                  birthdate: '1',
                  relGender: '1'
                },
                multiple: {
                  relPrincipal: {
                    3150: '1',
                    5711: '1',
                    5712: '1'
                  }
                },
                multipleAll: {
                  relMail: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setTargetEntity('1'))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
