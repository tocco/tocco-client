import * as actions from '../../../src/modules/entityModels/actions';

describe('entityModels actions', () => {
  it('requestEntityModels should create REQUEST_ENTITY_MODELS action', () => {
    expect(actions.requestEntityModels()).to.deep.equal({
      type: actions.REQUEST_ENTITY_MODELS
    });
  });

  it('receiveEntityModels should create RECEIVE_ENTITY_MODELS action', () => {
    expect(actions.receiveEntityModels([{
      name: 'User'
    }])).to.deep.equal({
      type: actions.RECEIVE_ENTITY_MODELS,
      models: [{
        name: 'User'
      }]
    });
  });
})
